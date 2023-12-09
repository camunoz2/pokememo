export const Background = (): JSX.Element => {
  return (
    <>
      <div className="bg-pattern w-full h-full -z-20 fixed top-0" />
      <div className="w-full h-full -z-10 fixed bg-color-cyan/30 backdrop-blur-sm top-0" />
    </>
  )
}
