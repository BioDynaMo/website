# BioDynaMo Website Docs

This readme will serve as a reference on how to maintain and update the BioDynaMo website. 

## General

The file system for the repository is seperated as follows:
- **src**: 
	- *components*: contains things such as search module, layout, header, boxes, etc
	- *data*: contains yaml files describing sidebars (see more in markdown pages)
	- *images*: contains all the svg icons as well as header blank backgrounds
	- *pages*: contains javascript website pages
	- *styles*: contains all the css files dictating styling for the website
	- *templates*: contains the formatting for markdown created pages as well as the formatting for the newsfeed on the home page 
	- *utils*: contains the `PostHeaderConfig` used for markdown based pages headers
- **static**: contains all pre-created assets (like html files that need to be loaded into the website), as well as a gallery and team folders for images for their respective pages
- **gatsby**: contains the files that automatically create pages from the markdown files 
- **docker**: contains dockerfile to build and use container to develop and test website
- **content**: contains all the markdown files that make up the content (it is a submodule based off the biodynamo repo)

To develop the gatsby website, a `.env.development` file is needed.
The template for it is:
```
SITE_URL="http://local:8000"
SERVICE_WORKER_KILL_SWITCH="false"
```
To build and serve the gatsby website, a `.env.production` file is needed.
The template for it is the same as for development.

Commands to develop the website locally are:
``` bash
yarn
gatsby develop
```
Commands to build and serve locally are:
```bash
yarn
gatsby build
NODE_ENV=production gatsby serve 
```
The `yarn` command is used to manage dependencies, plugins and packages for the website.
`*lock*` should be deleted as they often create problems when rebuilding or redeveloping.

## Markdown Based Pages

Markdown files can be used to create pages such as in the user guide and dev guide. 
To do so a gatsby plugin was used (gatsby-transformer-sharp, as seen in `gatsby-config.js`).
The `gatsby/` directory contains the javascript files that automatically generate the markdown files into pages.

### The Importance of Frontmatter 

All pages created with markdown files need frontmatter. 
This frontmatter helps dictate which section the particuliar markdown file belongs to (user guide, dev guide, etc).
The minimum template for markdown frontmatter used is as follows:
```
---
title: "Example Title"
date: "YYYY-MM-DD"
path: "/path/to/the/markdown/"
meta_title: "example_title"
meta_description: "XXX"
toc: true
sidebar: "XXX"
---
```
The title of the markdown based page will be automatically created using the title in the frontmatter.
Furthermore, toc and sidebar are important for the layout and placement of the markdown based page in the website.
The `toc` section dictates wheter there should be a table of content on the right hand side of the page, the possible values are: true, false or null (null will considered as true).
The `sidebar` section dictates the section that this markdown file belongs to.
To add a file to a specific sidebar the `sidebar` field should contain the name of the `.yaml` it belongs to.

### Sidebars 

As mentioned previously, pages using markdown as their base, can be grouped by a sidebar.
This sidebar file is a `.yaml` file that should be placed in `src/data/sidebars/` (only the user and dev guide sidebars can be found in `content/biodynamo/doc/sidebars/`).
The sidebar files follow the template below:
```yml
- groups:
  - group: First Header
    items: 
      - title: First page of the subpart
        link: /path/to/the/markdown/
      - title: Second page of the subpart
        link: /path/to/the/markdown/ 
  - group: Second Header
    items:
      - title: First of the drop down 
        link: /path/to/the/markdown/ 
      - title: More pages
        link: /path/to/the/markdown/ 
      - title: Even more pages
        link: /path/to/the/markdown/ 
```
Furthermore, settings and options related to getting/creating the sidebar can be found in `src/components/common/sidebar/`. 

### Layout 

The layout for pages using markdowns can be found in `templates/markdown/post.js`.
The header for these pages are configured in `src/utils/getPostHeaderConfig.js` and the component that builds the header can be found in `src/components/common/PostHeader.js`.
Excluding the previously mentiomned header, the rest of the page layout can be found in `src/components/layout`, this is the general website layout.

## Javascript Pages

There are three main javascript pages: home, about and gallery pages.
The documentation page is a just a simple landing page made to direct the user towards one of the three available guides.

### Home Page

The home page is the file `src/pages/index.js`, it follows the standard website layout.
All the components visible to this page can be found in the `src/components/home/` directory.

The `Home Header.js` file configures the text, links and display of the header.

The `Carousel.js` configures the image carousel seen on the home page.

The `BlogList.js` configures the settings and query for the newsfeed on the home page.
The maximum number of articles displayed can be modified on the `index.js` file itself.

### Documentation Landing Page



## Copyright & License

Copyright (c) 2018-2019 Ghost Foundation - Released under the [MIT license](LICENSE).
