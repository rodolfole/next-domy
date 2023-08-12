# Airbnb Clone

<img src="https://res.cloudinary.com/dtqijixar/image/upload/v1691862653/Previews/Preview_Rental_gs42te.jpg" height="300px"/>

### [Demo](https://next-rental-app.vercel.app)

## Cloning the repository

```shell
git clone https://github.com/rodolfole/next-rental-app.git
```

## Getting Started

Install the dependencies:

```sh
$ pnpm i
# or
$ yarn
# or
$ npm i
```

Setup .env file

```js
DATABASE_URL=
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

Config prisma

```sh
$ pnpm prisma generate
$ pnpm prisma db push
```

Start the app

```sh
$ pnpm dev
# or
$ yarn
# or
$ npm run dev
```

## Built With

- Nextjs 13
- Prisma
- MongoDB
- Tailwind
- Zustand
