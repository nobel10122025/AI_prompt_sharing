import Feed from "@components/Feed"

function HomePage() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">discover & share</h1>
      <span className="orange_gradient text-center head_text">AI-powered Prompts</span>
      <p className="desc text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Feed />
    </section>
  )
}

export default HomePage