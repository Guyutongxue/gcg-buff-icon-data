# gcg-buff-icon-data

Data for Genius Invokation (GCG) "status" icon. 

Seems that GenshinData repo doesn't provide enough info for generating relationship betweens status and its icon (see [here](https://github.com/theBowja/GenshinData-scripts/blob/10c9622a352dbe2c2aac54166f1a37f0c2a34f32/extract/Genshin/extractTcgStatusEffect.js#L69)), so I'm trying to manually maintain it.

All icons can be exported from Genshin client data by using [AssetStudio](https://github.com/RazTools/Studio) with:

```
.\AssetStudioCLI.exe --silent "C:\Program Files\Genshin Impact\Genshin Impact Game\YuanShen_Data\StreamingAssets\AssetBundles\blocks" "Your\Output\Dir" --types Sprite --game GI --names "[Gg]cg" 
```

(Above command extract all images related to GCG.)
