export const Background = () => {
  return (
    <>
      <div className="bg-pattern w-full h-full -z-20 absolute" />
      <div className="w-full h-full -z-10 absolute bg-color-cyan/30 backdrop-blur-sm" />
    </>
  );
};
