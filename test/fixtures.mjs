export const yaml = /* yaml */ `
title: Example
owner:
  name: Preston-Werner
  dob: 1979-05-27T15:32:00.000Z # dates
`;

export const toml = /* toml */ `
title = "Example"

[owner]
name = "Preston-Werner"
dob = 1979-05-27T07:32:00.000-08:00 # dates
  `;

export const json5 = /* json5 */ `
{
  title: 'Example',
  owner: {
    name: 'Preston-Werner',
    dob: '1979-05-27T07:32:00-08:00', // dates
  },
}
`;

export const jsonc = /* jsonc */ `
{
  "title": "Example",
  "owner": {
    "name": "Preston-Werner",
    "dob": "1979-05-27T07:32:00-08:00" // dates
  }
}`;

export const json = /* json */ `

{
  "title": "Example",
  "owner": {
    "name": "Preston-Werner",
    "dob": "1979-05-27T07:32:00-08:00"
  }
}

`;
