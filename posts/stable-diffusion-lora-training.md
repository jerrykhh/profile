---
icon: "sd-model-result.png"
uri: "stable-diffusion-lora-training"
title: "Stable Diffusion LoRA training"
description: "I trying to finetune the stable diffusion model using LoRA training. My target is tune the customize faces to build up the virtual agent and impersonate a real person."
date: "2023-06-10"
---


# Stable Diffusion

I trying to finetune the stable diffusion model using LoRA training. My target is tune the customize faces to build up the virtual agent and impersonate a real person which means I need to develop many pipeline for automation post the story, post and so on. But anyway, we need to train the model first.


## Limitation
Generally, the people always post the close-up images lead to the model generate the full body image may contains some mistakes.


## Step 1: Dataset preparing

I use `ig-follower` to download all images of post in instagram which is developed by myself.

### Useful link
| URL | Remark |
| -- | -- |
| [birme.net](https://www.birme.net/) | Resize and Crop Image Webpage |


1. Preapre at least 15 images and contains different light, direction or environment
2. For improve the training, I strongly recommand following things
   1. Pick some more simple background image and don't have any things is covered the face included the fingers, hand and so on. (Glasses is fine, but it must be contain a certain amount of images)
   2. If your size dataset > ~80 images, you can contains some image is removed the background (original color (different color for each removed bg image, if same color it may overfit))
      1. [Segment Anything](https://segment-anything.com/demo) for remove the background of image, research by Meta AI
3. Crop and resize the Image to square (768x768, 512x512, etc). You can use birme.net to help. The resolution will affect the training result and the hardware requirements.

#### Random Background color Python Func
```python
def png_add_random_background(image_path:str, out_dir:str):
    
    img = Image.open(image_path)
    path = Path(image_path)
    if not path.is_file() and not path.suffix.endswith('.png'):
        print("This is not a PNG file")
        return
    
    background_color = random.choice(background_colors)
    
    image_size = img.size
    
    if img.size[0] > img.size[1]:
        image_size = (image_size[0],image_size[0])
    elif image_size[1] > image_size[0]:
        image_size = (image_size[1],image_size[1])
    
    bg = Image.new("RGB", image_size, background_color)
    bg.paste(img, mask=img.split()[-1])
    
    if out_dir[-1] != "/":
        out_dir += "/"
        
    print(path.stem)
    bg.save(f"{out_dir}{path.stem}.png", "PNG")


```

## Step 2: Training Config

The following infromation based on Colab to setup the training environment. **Colab free is not allowed for stable-diffusion now.**

In this step, I will use the `kohya-LoRA-dreambooth.ipynb`

Latest version of ` kohya-LoRA-dreambooth.ipynb` can be found at [here](https://colab.research.google.com/github/sagiodev/stablediffusion_webui/blob/master/StableDiffusionUI_ngrok_sagiodev.ipynb).

ref: [Stable Diffusion Art](https://stable-diffusion-art.com)

### Reminder for training

1. chilloutmix_NiPrunedFp32Fix, this model will more effective in asian people generally
2. (Optional) To improve the model accuracy, we can edit the prompt for each image although we will use the Waifu Diffusion Tagger to generate the prompt but sometime the promote is wrong and missing some important keywords like "glasses", "full body" and etc.
3. In the LoRA and Optimizer Config, if you have ~15 images you can select small size of `network_dim` and `network_alpha` the model size will around 16MB. However, if you have >50 images please chosen large size of above parameters.
4. In `num_epochs`, it may at least 100 based on some discussion on Internet
5. If you have large dataset, please use A100 or more powerful GPU. Time is money! From my exp., T4(~7hours) vs A100(~1hour)


Details of trainning setting you can check my colab notebook: [here](https://colab.research.google.com/drive/1pL8FaPwiDEVdFijsDTMtU_xjMd9oWyG9?usp=sharing)

### Video Tutorial
Youtube: [guildline (Cantonese)](https://www.youtube.com/watch?v=is7TNhPVJEo)

Youtube: [latest Update](https://www.youtube.com/@shina_matsu)

## Result of Training
Fineturned model you need to put it to `stable-diffusion-webui/models/Lora/`

You will find the LoRA at 
<img src="/blog/stable-diffusion-lora-training/sd-ui-lora-btn.jpg" class="rounded"/>

The following is details of configuration of generated image.

### Positive Prompt
```
<lora:model_t1dataset_v1-000225:1>, (((t1model))), ((1girl)) portrait photo of 8k ultra realistic, lens flare, atmosphere, glow, detailed, intricate, full of colour, cinematic lighting, trending on artstation, hyperrealistic, focused, extreme details, cinematic, masterpiece,
```

### Negative Prompt
```
(nsfw), paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, glans, extra fingers, fewer fingers (watermark:1.2) white letters:1/1
```

### Config
```
Steps: 60, Sampler: DPM++ 2M Karras, CFG scale: 7, Size: 768x768
```

### Result
<img src="/blog/stable-diffusion-lora-training/sd-model-result.png" class="rounded"/>
