# Bridgnorth Booking System Architecture 
This document explains the architecture of the entire system, the different layers and how these layers interact. This is my interpretation of how the system works built from my experience of creating it. This account may not be 100% technically accurate 

**Development**:

Browser --> Vite --> Express --> PostgreSQL

**Production**:

Browser --> Plesk web server --> Express --> PostgreSQL

**Request Structure**
When a user visits the webpage, the browser requests an index.html, this points to a js bundle of the compiled React app. The browser downloads and runs this app. From this point on no more pages/files are requested. The browser then requests data when needed and the app updates/redraws based on this recieved data.

The server can't send data to the browser without a request. So to get around this and update the browser when server data changes you can use Polling (make a fetch request to the server every set period) OR the browser makes one request and the server keeps this open (Server-Side Events SSE)
## Technologies 
The various technologies used in this project and their role


### Web: vite & tsc
Vite is the chosen compiler for Typescript and JSX. It compiles the Typescript and React framework code into plain files ready to upload to the server 

`tsc -b && vite build` is called by running `npm run build`. tsc type checks the code and provided that command is successful, vite builds the plain output files to web/dist/

`npm run dev` (when developing react app) runs `vite` which pushes pages to the browser. It creates a two-way connection, pushing only changed pieces so that a page can update without being reloaded. Because tsc is not run by dev, type errors are only caught in build

In server/dist tsc type checks and emits the code. In web/dist it type checks and vite emits the code.

Vite: v8.3.1
tsc: v7.0.2

### Server: tsx & tsc
tsx translates the TypseScript in memory as the program runs and restarts the program when a file is updated. Called by `npm run dev`

tsx: v4.23.15
tsc: v7.0.2

### Node.js
A javascript runtime enviroment that allows javascript to run outside of a browser, allowing development and use of js on the server side

Node is designed to allow asynchronous I/O events. An event is created when a client attempts to access a file on the server 

Node: v26.10.0

#### Express
A node code library for creating web applications and APIs. Plesk web server routes API requests to Express and express calls the associated handler (typescript) code. 
Express is installed only on the server

Express: v5.2.1

#### React
A js library that builds screens out of small pieces that redraw themselves when the data they display changes
React is installed only on the web

#### JSX
A syntax extension for js that allows the writing of HTML-like tags inside js. Used by React

#### TypeScript 
JavaScript with type checking 

### pg
pg (node-postgres) is a node library responsible for sending SQL requests to the PostgreSQL server over the network

## Software
Details of the software used in development
### Postgres and pgAdmin 4
Local database work is carried out through the pgAdmin 4 app that is a GUI for the PostgresSQL servers created in Postgres.app.

To create a server of PostgresSQL v16 you must download the version of Postgres.app that includes previous PostgresSQL versions.

PostgresSQL: v16.5
Postgres.app: v2.9.6

## Database 
To set up the local database for development:
1. Download Postgres
2. Download pgadmin 4
3. Create server `bn_rowing_dev` at port `5432` with `PostgreSQL 16`. Choose the data directory to be a a subfolder of your project root called `database`
4. Add this folder to your `.gitignore`
5. Once server created, click 'Initialise'
6. In pgadmin 4 register a server with details:

	```
	Name: bn_rowing_dev
	Port: 5432
	Hostname/address: localhost
	Maintanence database: postgres
	Username: postgres
	```
7. Open query tool and connect as user `postgres` and run -in order- the queries found in `BridgnorthRC-Booking/docs/db/setup`
8. Connect as user `rowing` and run the queries found in `BridgnorthRC-Booking/docs/db/migrations`

## Project File Structure
```
BridgnorthRC-Booking
|- server 
	|- dist (JS output of from tsc)
	|- src (TypeScript source)
|- web
	|- dist (bundled output of tsc  vite build)
	|- index.html 
	|- src (TS/React source)
	|- public (icons)
```

`dist` stands for distributable and is the version of the code that is shipped (post compilation) compared to the raw files in `src`

The `server` and `web` directories represent separate systems, each with a `package.json` and `node_modules`. One for the react application on the user end (web) and one for the server side system. Express is installed only on the server and react omly on the web

`public` contains icons (favicon.svg and later the PWA icons) that vite copies indo dist later 

`server` = **back end** (local machine or production server) 

`web` = **front end**, `web/dist` holds the files that run in the client's browser, a React app. Vite is present in `web` locally to serve the pages to the browser during development and for compilation

### Connection Process
React applications are called 'single-page apps' because the entire app exists in the index.html page with the contents swapped out through javascript commands 
1. Client queries site for `index.html`
2. `index.html` contains an empty div and script tag pointing to `src/main.tsx`

