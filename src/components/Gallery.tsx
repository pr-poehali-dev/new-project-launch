const projects = [
  {
    id: 1,
    title: "Остекление и утепление",
    location: "Москва, Арбат",
    area: "8 м²",
    img: "/images/hously-1.png",
  },
  {
    id: 2,
    title: "Отделка под ключ",
    location: "Москва, Митино",
    area: "6 м²",
    img: "/images/hously-2.png",
  },
  {
    id: 3,
    title: "Панорамное остекление",
    location: "Москва, Сокол",
    area: "12 м²",
    img: "/images/hously-3.png",
  },
  {
    id: 4,
    title: "Балкон-кабинет",
    location: "Подмосковье, Химки",
    area: "7 м²",
    img: "/images/hously-4.png",
  },
  {
    id: 5,
    title: "Совмещение с комнатой",
    location: "Москва, Выхино",
    area: "10 м²",
    img: "/images/desk.png",
  },
  {
    id: 6,
    title: "Французский балкон",
    location: "Москва, Пресня",
    area: "5 м²",
    img: "/images/exterior.png",
  },
];

export default function Gallery() {
  return (
    <section id="about" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="uppercase text-sm tracking-wide text-neutral-500 mb-3">Портфолио</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
            Наши работы
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="group overflow-hidden">
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pt-4 pb-6">
                <h3 className="text-lg font-semibold text-neutral-900">{project.title}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-neutral-500">
                  <span>{project.location}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-400 inline-block" />
                  <span>{project.area}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
