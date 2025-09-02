import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { AuthModal } from "./components/AuthModal";
import { OnboardingWizard } from "./components/OnboardingWizard";
import { Dashboard } from "./components/Dashboard";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { FullPageLoader } from "./components/LoadingSpinner";
import {
  User,
  GoalHierarchy,
  OnboardingData,
  AppState,
} from "./types";

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    user: null,
    isAuthenticated: false,
    currentFlow: "landing",
    onboardingData: {
      step: 1,
      detailedPrompt: "",
      contextSelectors: {
        primaryFocus: [],
        lifeStage: "",
        timeCommitment: "",
        workingStyle: "",
        resources: "",
      },
      completed: false,
    },
    goalHierarchy: null,
    dailyActions: [],
    userProgress: {
      streak: 0,
      totalActions: 0,
      completedActions: 0,
      weeklyStats: [],
      monthlyMilestones: [],
    },
    isLoading: false,
    error: null,
  });

  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Load user data on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("dayslide_user");
    const savedGoalHierarchy =
      localStorage.getItem("dayslide_goals");
    const savedOnboarding = localStorage.getItem(
      "dayslide_onboarding",
    );

    try {
      if (savedUser) {
        const user = JSON.parse(savedUser);
        const goalHierarchy = savedGoalHierarchy
          ? JSON.parse(savedGoalHierarchy)
          : null;
        const onboardingData = savedOnboarding
          ? JSON.parse(savedOnboarding)
          : appState.onboardingData;

        setAppState((prev) => ({
          ...prev,
          user: {
            ...user,
            createdAt: new Date(user.createdAt),
            lastActive: new Date(),
            onboardingCompleted: onboardingData.completed,
          },
          isAuthenticated: true,
          currentFlow:
            goalHierarchy && onboardingData.completed
              ? "dashboard"
              : "onboarding",
          goalHierarchy,
          onboardingData,
        }));
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
      // Clear corrupted data
      localStorage.removeItem("dayslide_user");
      localStorage.removeItem("dayslide_goals");
      localStorage.removeItem("dayslide_onboarding");
    } finally {
      // Add a small delay to prevent flash
      setTimeout(() => setIsInitializing(false), 500);
    }
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);

    // Smooth scroll to sections for navigation
    if (page === "features") {
      document
        .getElementById("features")
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (page === "about") {
      document
        .getElementById("reviews")
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (page === "pricing") {
      document
        .getElementById("cta")
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (page === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStartJourney = () => {
    if (
      appState.isAuthenticated &&
      appState.user?.onboardingCompleted &&
      appState.goalHierarchy
    ) {
      // User is authenticated and has completed onboarding, go to dashboard
      setAppState((prev) => ({
        ...prev,
        currentFlow: "dashboard",
      }));
    } else if (appState.isAuthenticated) {
      // User is authenticated but needs onboarding
      setAppState((prev) => ({
        ...prev,
        currentFlow: "onboarding",
      }));
    } else {
      // User needs to authenticate first
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    // Get user data from localStorage (set by AuthModal)
    const savedUser = localStorage.getItem("dayslide_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      const user: User = {
        ...userData,
        createdAt: new Date(),
        lastActive: new Date(),
        onboardingCompleted: false,
      };

      setAppState((prev) => ({
        ...prev,
        user,
        isAuthenticated: true,
        currentFlow: "onboarding",
      }));
    }

    setIsAuthModalOpen(false);
  };

  const handleOnboardingComplete = (
    goalHierarchy: GoalHierarchy,
    onboardingData: OnboardingData,
  ) => {
    // Save data to localStorage
    localStorage.setItem(
      "dayslide_goals",
      JSON.stringify(goalHierarchy),
    );
    localStorage.setItem(
      "dayslide_onboarding",
      JSON.stringify(onboardingData),
    );

    // Update user completion status
    if (appState.user) {
      const updatedUser = {
        ...appState.user,
        onboardingCompleted: true,
      };
      localStorage.setItem(
        "dayslide_user",
        JSON.stringify(updatedUser),
      );

      setAppState((prev) => ({
        ...prev,
        user: updatedUser,
        goalHierarchy,
        onboardingData,
        currentFlow: "dashboard",
      }));
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("dayslide_user");
    localStorage.removeItem("dayslide_goals");
    localStorage.removeItem("dayslide_onboarding");

    // Reset app state
    setAppState({
      user: null,
      isAuthenticated: false,
      currentFlow: "landing",
      onboardingData: {
        step: 1,
        detailedPrompt: "",
        contextSelectors: {
          primaryFocus: [],
          lifeStage: "",
          timeCommitment: "",
          workingStyle: "",
          resources: "",
        },
        completed: false,
      },
      goalHierarchy: null,
      dailyActions: [],
      userProgress: {
        streak: 0,
        totalActions: 0,
        completedActions: 0,
        weeklyStats: [],
        monthlyMilestones: [],
      },
      isLoading: false,
      error: null,
    });

    setCurrentPage("home");
  };

  const handleBackToLanding = () => {
    setAppState((prev) => ({
      ...prev,
      currentFlow: "landing",
    }));
  };

  // Show loading screen during initialization
  if (isInitializing) {
    return (
      <FullPageLoader message="Initializing your journey..." />
    );
  }

  // Render different flows based on current state
  if (appState.currentFlow === "onboarding" && appState.user) {
    return (
      <ErrorBoundary>
        <OnboardingWizard
          user={appState.user}
          onComplete={handleOnboardingComplete}
          onBack={handleBackToLanding}
        />
      </ErrorBoundary>
    );
  }

  if (
    appState.currentFlow === "dashboard" &&
    appState.user &&
    appState.goalHierarchy
  ) {
    return (
      <ErrorBoundary>
        <Dashboard
          user={appState.user}
          goalHierarchy={appState.goalHierarchy}
          onLogout={handleLogout}
          onBackToLanding={handleBackToLanding}
        />
      </ErrorBoundary>
    );
  }

  // Default landing page flow
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#1a1a2e]">
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          user={appState.user}
          onLogin={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />

        <main>
          <HeroSection
            onStartJourney={handleStartJourney}
            isAuthenticated={appState.isAuthenticated}
            user={appState.user}
          />

          <div id="reviews">
            <ReviewsSection />
          </div>

          <div id="features">
            <FeaturesSection />
          </div>

          <div id="cta">
            <CTASection onStartJourney={handleStartJourney} />
          </div>
        </main>

        <Footer />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    </ErrorBoundary>
  );
}