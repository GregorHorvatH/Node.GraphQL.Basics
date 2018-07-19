# Node + Express + Postgres + Sequelize + GraphQL
## a very simple example how to connect to DB with GraphQL

## postgres parameters
- login: postgres
- password: postgres
- port: 5432

## fetch example
`fetch('http://localhost:3000/graphql', {`
`	method: 'POST',`
`	headers: { 'Content-Type': 'application/json' },`
`  	body: JSON.stringify({`
`		"query": "query getUserData($id: Int!) {  user( id: $id ) {    id    firstName    lastName    email  }}",`
`		"variables": {`
`			"id": 10`
`		}`
`	}),`
`})`
`.then(res => res.json())`
`.then(res => console.log(res.data));`
