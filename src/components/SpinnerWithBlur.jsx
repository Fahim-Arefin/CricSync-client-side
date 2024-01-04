function SpinnerWithBlur() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-300 opacity-70 backdrop-blur-sm z-50">
      <span className="loading loading-ring loading-md"></span>
    </div>
  );
}

export default SpinnerWithBlur;
