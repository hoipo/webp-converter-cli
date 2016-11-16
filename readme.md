# webp-converter-cli

The CommandLine tool for converting jpg or png files to webp, recursively.

## Awsome featurn ✧٩(ˊωˋ*)و✧
This tool would search the jpg or png files by the head infomation with the files, so even the files without the ext name,they also would be found and be converted.

so enjoy it !

## Installation

    $ npm install -g webp-converter-cli

## Usage

webp-converter-cli allow you to convert your images within the current directory, recursively or not. 

After installation, just run command `webpc` in ternimal.


To convert all images within the current directory and subdirectoies, use the -r flag

    webpc -r

To convert the specific image files (assets/img.jpg in this example), you may run the following command.

    webpc -f assets/img.jpg
    
or

     webpc -f assets/img1.jpg,assets/img2.png

for more help infomation, you could run the -h flag to check it out.

    webpc -h

## License

Copyright (c) 2016 Hoipo Cheung

Licensed under the MIT license.

See LICENSE for more info.