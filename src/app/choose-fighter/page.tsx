const getFighters = async () => {
  const res = await fetch("https://ufc-api-7z3p.onrender.com/api/all-fighters");
  return res.json();
};

export default async function ChooseFighter() {
  const fighters = await getFighters();
  console.log(fighters);

  return (
    <section>
      <div>{fighters.body.data.map((fighter) => fighter.name)}</div>
      <input type="text" placeholder="введите имя бойца" />
    </section>
  );
}
