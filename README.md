# node-file-manager
Compress example:
```
compress C:/some_folder/some_file.txt C:/some_folder/ (the file is created with the name + .br)
```
Please use following paths:
```
cd 'Some folder'
cd directory/directory
cd 'directory\directory'
cd './directory'
```
Please, don't use `/` in path like this `cd /directory` without `.`
Copy file example:
```
cp C:\Users\Anton\Test2\file ./another_folder
cp C:\Users\Anton\Test2\file .
cp 'C:\Users\Anton\Test 3\file name.txt' ./
cp 'C:\Users\Anton\Test 3\file name.txt' .
```