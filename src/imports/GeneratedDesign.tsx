function Frame() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start pb-[13px] pl-[26px] pr-[25px] pt-3.5 relative rounded-[8px] shrink-0" data-name="Frame">
      <div aria-hidden="true" className="absolute border-2 border-[#8a85ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#e0e0e0] text-[16px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">Login</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between pb-[24.2px] pt-6 px-8 relative w-full">
          <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[#e0e0e0] text-[30px] text-nowrap tracking-[-0.75px]">
            <p className="leading-[36px] whitespace-pre">dayslide</p>
          </div>
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-start pb-[0.588px] pl-[0.4px] pr-[0.013px] pt-0 relative shrink-0" data-name="Frame">
      <div className="bg-[#b0b0b0] rounded-[2.68435e+07px] shrink-0 size-2" data-name="Rectangle" />
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#b0b0b0] text-[12px] text-nowrap">
        <p className="leading-[16px] whitespace-pre">0 characters</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#8a85ff] box-border content-stretch flex flex-col items-start justify-start opacity-50 px-6 py-2 relative rounded-[8px] shrink-0" data-name="Frame">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#1a1b1e] text-[16px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">Share Thought</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between pb-[15.6px] pl-4 pr-[15.4px] pt-[0.4px] relative w-full">
          <Frame2 />
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#2c2d30] h-[127px] relative rounded-[12px] shrink-0 w-full" data-name="Frame">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(138,133,255,0.3)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25),0px_0px_0px_0px_rgba(0,0,0,0),0px_0px_0px_0px_rgba(0,0,0,0),0px_0px_0px_0px_rgba(0,0,0,0),0px_0px_0px_0px_rgba(0,0,0,0)]" />
      <div className="flex flex-col justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[158.6px] h-[127px] items-start justify-center pb-[2.4px] pt-[17px] px-[1.6px] relative w-full">
          <div className="font-['Lexend_Deca:Light',_sans-serif] font-light h-6 leading-[0] relative shrink-0 text-[#b0b0b0] text-[24px] w-[342px]">
            <p className="leading-[24px]">sight of the right thing</p>
          </div>
          <Frame4 />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[31.2px] items-start justify-end pb-0 pt-[0.4px] px-0 relative shrink-0" data-name="Frame">
      <Frame5 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="box-border content-stretch flex font-['Inter:Medium',_sans-serif] font-medium gap-6 items-start justify-center leading-[0] not-italic pb-[0.2px] pt-0 px-0 relative shrink-0 text-[#8a85ff] text-[14px] text-center text-nowrap w-full" data-name="Frame">
      <div className="relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">Learn More</p>
      </div>
      <div className="relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">Get Started</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[16.2px] items-center justify-center relative shrink-0 w-full" data-name="Frame">
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#b0b0b0] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">Discover daily inspiration through meaningful conversations</p>
      </div>
      <Frame7 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#1a1b1e] box-border content-stretch flex flex-col gap-[204.4px] items-center justify-center pb-[224.8px] pt-0 px-0 relative shrink-0 w-full" data-name="Frame">
      <Frame1 />
      <Frame6 />
      <Frame8 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-start overflow-clip relative shrink-0 w-full" data-name="Frame">
      <Frame9 />
    </div>
  );
}

export default function GeneratedDesign() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-start relative size-full" data-name="Generated Design">
      <Frame10 />
    </div>
  );
}