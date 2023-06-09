---
icon: "icon.png"
uri: "utils"
title: "utils"
name: "utils"
description: "converter/ It combines many convertor-related projects, such as the filename, website to a book, etc."
date: "2022-08-04"
tag: ""
repository: "https://github.com/jerrykhh/utils"
language: "Python"
---

# utils

## Convertor

| Project            | Description                                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| FNC                | Convert all folder/file names, including convert to another Chinese (Traditional/Simplified Chinese), delete specific words. |
| acgn.convert       | convert the comic.acgn.cc view page to the .pdf like a book                                                                  |
| product_img_to_jpg | convert product images to .JPG                                                                                               |

## File Name Convertor(FNC)

Convert all folder/file names, including convert to another Chinese (Traditional/Simplified Chinese), delete specific words.

### Installation

```
pip install -r requirements.txt
```

### Usage

Convert Chinese filename

```
python main.py convert [opencc-mode] [paths..]
# python main.py convert s2t /Users/jerry/Document/资料1/ /Users/jerry/Document/资料2/
```

Remove specific word

```
python main.py remove [word] [paths..]
# python main.py remove "jerry" /Users/jerry/Document/jerry-data1/
# It will replace "jerry" to "" in all file/folder names of provided path
```

### OpenCC

| Mode  | Description                                   |
| ----- | --------------------------------------------- |
| hk2s  | 繁體中文 (香港) -> 簡體中文                   |
| s2hk  | 簡體中文 -> 繁體中文 (香港)                   |
| s2t   | 簡體中文 -> 繁體中文                          |
| s2tw  | 簡體中文 -> 繁體中文 (台灣)                   |
| s2twp | 簡體中文 -> 繁體中文 (台灣, 包含慣用詞轉換)   |
| t2hk  | 繁體中文 -> 繁體中文 (香港)                   |
| t2s   | 繁體中文 -> 簡體中文                          |
| t2tw  | 繁體中文 -> 繁體中文 (台灣)                   |
| tw2s  | 繁體中文 (台灣) -> 簡體中文                   |
| tw2sp | 繁體中文 (台灣) -> 簡體中文 (包含慣用詞轉換 ) |

## Acgn.cc Convertor

This program will convert the comic.acgn.cc view page to the .pdf like a book. The following output will show when the program finish

```
=========================
{book_name}  {pages_of_book} pages
{book_name}  {pages_of_book} pages
{book_name}  {pages_of_book} pages
=========================
```

### Installation

```
git clone https://github.com/jerrykhh/acgn.convert.git
cd acgn.convert
pip install -r requirements.txt
```

### Usage

```
python main.py
```

Enter following information:

```
ACGH.convert starting...
Please enter EXIT to start the PDF generate
Please Enter the URL: [Please Enter the View page such as "https://comic.acgn.cc/view-66017.htm"]
[1]: https://comic.acgn.cc/view-66017.htm

Please Enter the URL: [If Enter "EXIT" it will start to generate the Book pdf]
```

## product_img_to_jpg

### Image to JPG

It will convert all image file to JPG, the following is more details

Directory structure:

```
.
├── product1_id
|   ├── image1_name
|   ├── image2_name
└── product2_id
    ├── image1_name
    ├── image2_name
    └── image3_name

For example:
.
├── CLA-L01
│   ├── 0013_06_500x.jpg.webp
│   ├── 0014_05_500x.jpg.webp
│   ├── 1_b33467e1-59a2-4b52-8ecf-fa8330d1a792_1000x.jpg.webp
│   ├── 2_e130cb6f-d7d4-4d1d-8996-e6bd5a90a24f_1000x.jpg.webp
│   └── 3_4d179687-2d70-4ec9-bcf6-441443a5f7e0_1000x.jpg.webp
├── CLF-500
│   ├── CLF500LGClaymore3FaceMiniLightGrey01_700x_1_960x.jpg.webp
│   └── CLF500LGClaymore3FaceMiniLightGrey_1080x.jpg.webp
└── ST-941
    ├── 1_154e26ec-f773-42ac-9c04-a08be2a6a37c_700x.jpg.webp
    ├── 2_cde01734-94c6-4376-9528-dd0e31b150cd_700x.jpg.webp
    ├── 3_1b438112-0c7f-4d71-b4e7-6369a4d67157_700x.jpg.webp
    └── h0223001_4953571079417_180830112403_01_515.jpg

Result:
├── CLA-L01
│   ├── CLA-L01-asdd123.jpg
│   ├── CLA-L01-f77agh3.jpg
│   ├── CLA-L01-b4e7asd.jpg
│   ├── CLA-L01-asjn123.jpg
│   └── CLA-L01-asddf13.jpg
├── CLF-500
│   ├── CLF-500-asdzxd.jpg
│   └── CLF-500-aytdjd.jpg
└── ST-941
    ├── ST-941-asdj9u4.jpg
    ├── ST-941-dfgfsd3.jpg
    ├── ST-941-assdgaf.jpg
    └── ST-941-asdsdf4.jpg
```
