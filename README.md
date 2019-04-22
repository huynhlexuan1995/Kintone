# Kintone

# Create-kintone-plugin

npm install -g @kintone/create-plugin
==>
 create-kintone-plugin ${plugin name}

# In this article, a template is created with the directory name "HelloKintone".

$ create-kintone-plugin HelloKintone


# Please answer some questions to create your Kintone plug-in project
 Let's start!
 Input your plug-in name in English [1-64chars] HelloKintone
 Input your plug-in description in English [1-200] HelloKintone
 Does your plug-in support Japanese ? No
 Does your plug-in support Chinese ? No
 Input your homepage url for English (Optional)
 Does your plug-in support mobile views ? No
 Would you like to use @kintone/plugin-uploader ? Yes

# After the command has been finished, you can start development kintone plugin!

cd hello-kintone-plugin
npm start

Source code check using ESLint:

# Change your working current directory to created one
cd Sample_Plugin

# Execute the validation check
$ npm run lint

