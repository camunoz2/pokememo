export const Header = (): JSX.Element => {
  return (
    <div className="bg-color-darkblue py-2 drop-shadow-md">
      <div className="container mx-auto flex justify-between">
        <div className="text-white">
          <h1 className="text-xl font-bold">Pokememorize</h1>
          <p className="text-xs">by ArjelDev</p>
        </div>
        <a href="https://github.com/camunoz2/pokememo">
          <img src="/github.svg" alt="github icon" />
        </a>
      </div>
    </div>
  )
}
