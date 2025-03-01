export const obj = {
  types: {
    boolean: true,
    integer: 1,
    float: 3.14,
    string: "hello",
    array: [1, 2, 3],
    object: { key: "value" },
    null: null, // eslint-disable-line unicorn/no-null
    date: "1979-05-27T07:32:00-08:00",
  },
};

export const objWithDate = {
  types: {
    ...obj.types,
    date: new Date(obj.types.date),
  },
};

export const yaml = /* yaml */ `
types:
  boolean: true
  integer: 1
  float: 3.14
  string: hello
  array:
    - 1
    - 2
    - 3
  object:
    key: value
  'null': null
  date: 1979-05-27T15:32:00.000Z
`;

export const toml = /* toml */ `
[types]
boolean = true
integer = 1
float = 3.14
string = "hello"
array = [ 1, 2, 3 ]
null = "null"
date = 1979-05-27T15:32:00.000Z

[types.object]
key = "value"
  `;

export const json5 = /* js */ `
{
  types: {
    boolean: true,
    integer: 1,
    float: 3.14,
    string: 'hello',
    array: [
      1,
      2,
      3,
    ],
    object: {
      key: 'value',
    },
    null: null,
    date: '1979-05-27T07:32:00-08:00',
  },
}
`;

export const jsonc = /* jsonc */ `
{
  "types": {
    "boolean": true,
    "integer": 1,
    "float": 3.14,
    "string": "hello",
    "array": [
      1,
      2,
      3
    ],
    "object": {
      "key": "value"
    },
    "null": null,
    "date": "1979-05-27T07:32:00-08:00"
  }
}`;

export const json = /* json */ `

{
  "types": {
    "boolean": true,
    "integer": 1,
    "float": 3.14,
    "string": "hello",
    "array": [
      1,
      2,
      3
    ],
    "object": {
      "key": "value"
    },
    "null": null,
    "date": "1979-05-27T07:32:00-08:00"
  }
}

`;
