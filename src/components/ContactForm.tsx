import { useState } from "react";

const LEADS_URL = "https://functions.poehali.dev/6fdc7aec-5a66-4f93-b67d-74480942e373";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(LEADS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", address: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-neutral-950 py-24 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="uppercase text-sm tracking-wide text-neutral-500 mb-3">Бесплатный замер</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Оставьте заявку — приедем и рассчитаем
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            Замер и расчёт стоимости — бесплатно. Перезвоним в течение 30 минут и согласуем удобное время.
          </p>
          <div className="mt-10 flex flex-col gap-4 text-neutral-300 text-sm">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">1</span>
              Оставляете заявку
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">2</span>
              Приезжаем на замер бесплатно
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">3</span>
              Получаете проект и смету за 24 ч
            </div>
          </div>
        </div>

        <div>
          {status === "success" ? (
            <div className="bg-white/5 border border-white/10 rounded-none p-10 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-white text-2xl font-bold mb-2">Заявка принята!</h3>
              <p className="text-neutral-400">Перезвоним вам в течение 30 минут.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-neutral-400 text-xs uppercase tracking-wide mb-2">Имя *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Иван Иванов"
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-neutral-400 text-xs uppercase tracking-wide mb-2">Телефон *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+7 (999) 000-00-00"
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-neutral-400 text-xs uppercase tracking-wide mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ivan@mail.ru"
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-neutral-400 text-xs uppercase tracking-wide mb-2">Адрес объекта</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Москва, ул. Пушкина, д. 10, кв. 5"
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              {status === "error" && (
                <p className="text-red-400 text-sm">Что-то пошло не так. Попробуйте ещё раз.</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 bg-white text-black px-8 py-4 uppercase text-sm tracking-wide font-semibold hover:bg-neutral-200 transition-colors duration-300 disabled:opacity-50 cursor-pointer"
              >
                {status === "loading" ? "Отправляем..." : "Заказать бесплатный замер"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
