# Hola Mundo javascript action

This action prints "Hola Mundo" or "Hola" + the name of a person to greet to the log.

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"Mundo"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

uses: actions/hola-mundo-javascript-action@v1
with:
who-to-greet: 'Mona the Octocat'
