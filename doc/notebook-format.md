# Notebook file format
All notebook data is stored across a data directory.

## data/notebook.json
Global data, the notebook directory structure and note titles.

| Field   | Type            | Required | Description                                 |
|---------|-----------------|----------|---------------------------------------------|
| folders | Array of Folder | Yes      | List of folders at the root of the notebook |


### Folder

| Field      | Type              | Required | Description                                              |
|------------|-------------------|----------|----------------------------------------------------------|
| name       | string            | Yes      | Name of this folder                                      |
| subFolders | Array of Folder   | Yes      | This folder's subdirectories                             |
| notes      | Array of NoteInfo | Yes      | Notes contained directly in (as children of) this folder |

### NoteInfo

| Field    | Type        | Required | Description                                                                |
|----------|-------------|----------|----------------------------------------------------------------------------|
| id       | string      | Yes      | Unique id of this note. Must be usable as a 'console-friendly' filename.   |
| title    | string      | Yes      | Name of this folder                                                        |


## data/notes
Directory for note content files. Contains files of the form {NOTE-ID}.json.

## data/{NOTE-ID}.json
| Field   | Type   | Required | Description                                                              |
|---------|--------|----------|--------------------------------------------------------------------------|
| id      | string | Yes      | Unique id of this note. Must be usable as a 'console-friendly' filename. |
| content | string | Yes      | Text content of note                                                     |



