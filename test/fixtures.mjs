export const yaml = /* yaml */ `
title: "Example"
owner:
  name: "Preston-Werner"
  dob: 1979-05-27T07:32:00-08:00 # dates
`.trim();

export const toml = /* toml */ `
title = "Example"

[owner]
name = "Preston-Werner"
dob = 1979-05-27T07:32:00-08:00 # dates
  `.trim();

export const json5 = /* json5 */ `
{
  title: 'Example',
  owner: {
    name: 'Preston-Werner',
    // dates
    dob: '1979-05-27T07:32:00-08:00'
  }
}
`.trim();

export const jsonc = /* jsonc */ `
{
  "title": "Example",
  "owner": {
    "name": "Preston-Werner",
    "dob": "1979-05-27T07:32:00-08:00" // dates
  }
}
`.trim();

export const json = /* json */ `

{
  "title": "Example",
  "owner": {
    "name": "Preston-Werner",
    "dob": "1979-05-27T07:32:00-08:00"
  }
}

`;
