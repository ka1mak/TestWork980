# Weather Forecast App

> Тестовое задание на позицию Front‑End / React‑Developer (Next.js).

## 📌 Описание проекта
SPA‑приложение для просмотра текущей погоды и прогноза на несколько дней вперёд с возможностью поиска городов и добавления их в избранное.

* **Next 13 App Router** — рендер на сервере (SSR) + динамические маршруты.
* **TypeScript** — строгая типизация всех критически важных сущностей (API‑ответы, стейты, пропсы).
* **Zustand (Store)** — глобальное UI‑состояние (избранные города, ошибки, загрузка).
* **fetch API** — единый «центральный» `fetcher` с поддержкой `revalidate`/кеширования.
* **SCSS Modules + Bootstrap 5** — UI‑сетка и готовые компоненты.

## 🚀 Почему отказался от «гидратации» Zustand‑store
Изначально планировал класть ответ первого SSR‑запроса сразу в store через `hydrate()`, но отказался по трём причинам:
1. **Дублирование**: HTML уже содержит готовые данные, повторное уведомление подписчиков не даёт выигрыша (лишний `set`).
2. **Простота**: проп‑ drilling одного объекта в два UI‑компонента (<WeatherCard /> и <WeatherDetailCard />) короче и понятнее ревьюеру.
3. **SEO & производительность**: первый meaningful paint получает данные без JS‑логики; store подключается только при интеракциях (добавление в избранное, обновление).

## ⚡️ Главные фишки Next.js, задействованные в проекте
| Фича | Где используется |
|------|-----------------|
| **Server‑Side Rendering** | `app/page.tsx` делает первый запрос к OpenWeather API на сервере. |
| **Dynamic Routes** | `/city/[slug]/page.tsx` — детальная страница прогноза. |
| **Оптимизированный `fetch`** | Центральный `src/configs/fetcher.ts` вызывает `fetch(url,{ next:{ revalidate:3600 }})` — встроенное кэширование Vercel. |
| **Edge Runtime Ready** | Нет стороннего Axios → код может выполняться в Edge‑окружении без дополнительных полифиллов. |

## 🛠️ Технологии и библиотеки
* **React 19 / Next 15 (App Router)**
* **TypeScript 5**
* **Zustand 5** (минимальный store + middleware `persist` для избранного)
* **Bootstrap 5 / SCSS Modules**
* **OpenWeatherMap API**

## 🌐 Центральный fetcher
```ts
async fetchJson<T>(url:string, options?:RequestInit & { next?:{ revalidate:number } }):Promise<T> {
  const res = await fetch(url, options)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<T>
}
```
*Почему не Axios?* Vercel рекомендует нативный `fetch`, который они расширили для кеширования (`revalidate`, `revalidateTag`), stream‑роутинга и Edge‑совместимости.

## 📍 Хук `useGeolocation`
```ts
const { coordinates, error, getLocation } = useGeolocation()
```
*Запланировал авто‑определять город по lon/lat, но `navigator.geolocation` работает только на клиенте. В рамках задачи приоритетом был SSR, поэтому хук остаётся необязательной функцией, вызываемой после загрузки страницы.*

## 🎨 Почему Tailwind > Bootstrap (по личным ощущениям)
> В задании требовался Bootstrap, однако в боевых проектах предпочитаю Tailwind.

* **Интеллисенс** (`Tailwind CSS IntelliSense`) — автодополнение классов прямо в JSX.
* **tailwind.config.js** — мгновенная кастомизация тем, цветов, breakpoints.
* **Адаптив**: мобильные стили пишутся как `sm:`, `md:` утилиты в одну строку без медиа‑квери.

### 2 примера утилит, которых нет в Bootstrap
| Tailwind класс | Назначение |
|----------------|-----------|
| `backdrop-blur-sm` | Размывает фон под элементом (glass‑эффект). |
| `ring-offset-2 ring-indigo-500` | Полоска‑обводка (focus ring) вокруг интерактивных элементов. |

## 🚀 Как запустить
```bash
# 1. Клонируем репозиторий
$ git clone https://github.com/your‑nick/weather‑next13.git && cd weather‑next13

# 2. Устанавливаем зависимости
$ yarn i

# 3. Создаём .env.local
NEXT_PUBLIC_API_KEY=XXXXXXXXXXXX
NEXT_PUBLIC_WEATHER_API=https://api.openweathermap.org/data/2.5
NEXT_PUBLIC_GEO_API=http://api.openweathermap.org/geo/1.0

# 4. Запуск dev‑сервера
$ yarn dev
```

## 🗺️ Скрипты
| npm script | Назначение |
|------------|-----------|
| `dev` | Локальная разработка (`next dev`) |
| `build` | Продакшен‑сборка |
| `start` | Запуск собранного приложения |
| `lint`  | ESLint + Stylelint |

## 📝 TODO / Roadmap
- [ ] Интегрировать `react-query` для автоматической инвалидации прогнозов.
- [ ] Перевести UI на Tailwind + shadcn/ui.
- [ ] Добавить PWA‑оффлайн иконку, кэшировать последние данные.
- [ ] Темизация (dark/light) через Zustand + `next-themes`.

---
© 2025 — Кайрат Курбаналиев