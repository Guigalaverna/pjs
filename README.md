# PJS

> The script for lazy people 😴

<p align='center'>
  <img src="./.github/banner.gif" width="400" alt="Tom the cat going to sleep">
</p>

## What is PJS?

PJS or Project Setup is a script for setting up a project using templates build in YAML. I wrote this script because I was tired of typing the same commands over and over again and I wanted to be able to quickly set up a project without waiting for the templates created by frameworks's developers to be ready.

So, I choose use YAML as a format for storing the templates because it is easy to read and easy to write.

## How to write a template/setups?

All the templates are stored in a YAML file in `~/.config/pjs/setups.yaml`, and the file is automatically loaded when you run `pjs`.

### Structure of the file

```yaml
- name: <name of the setup> # Optional but recommended
  alias: <alias> # Required
  type: <type of the setup> # Required, you can see the list of types in types.json
  steps:
    - description: <description of the step> # Required
      command: <command> # Required
    - description: <description of the step> # Required
      command: <command> # Required
```

### Examples
If you want see how to write your setups, you can check examples in **examples folder**

Note: All examples must be placed in the setups file: `~/.config/pjs/setups.yaml`

[Open folder](./examples/)

## How to install PJS?
You can install PJS by typing the following command:

```bash
npm install pjss
```

if you want to use it in a global way.

```bash
npm install -g pjss
```

## How to use PJS?

You can use PJS by typing the following command:

```bash
pjs <alias> <project name>
```

### Available arguments

| Argument         | Description                                                                          |
| ---------------- | ------------------------------------------------------------------------------------ |
| `<alias>`        | The alias of the template you want to use, configured in `~/.config/pjs/setups.yaml` |
| `<project name>` | The name of the project you want to create.                                          |

| Option                | Description                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `--alias`, `-a`       | The same as `<alias>`                                                                          |
| `--projectName`, `-p` | The same as `<project name>`                                                                   |
| `--listSetups`, `-l`  | Show all available setups by type, if no type is specified or type is invalid, show all setups |

> The script will be create a project in current directory, so, if you run the script in `~/`, the project will be created in `~/<project name>`.

## License

This project is licensed under the [MIT license](./LICENSE).
