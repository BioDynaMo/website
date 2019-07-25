# BioDynaMo Website Docs

This readme will serve as a reference on how to maintain and update the BioDynaMo website.

## General

### File System

The file system for the repository is separated as follows:
- **src**:
	- *components*: contains things such as search module, layout, header, boxes, etc
	- *data*: contains yaml files describing sidebars (see more in markdown pages)
	- *images*: contains all the svg icons as well as header blank backgrounds
	- *pages*: contains javascript website pages
	- *styles*: contains all the css files dictating styling for the website
	- *templates*: contains the formatting for markdown created pages as well as the formatting for the news feed on the home page
	- *utils*: contains the `PostHeaderConfig` used for markdown based pages headers
- **static**: contains all pre-created assets (like html files that need to be loaded into the website), as well as a gallery and team folders for images for their respective pages
- **gatsby**: contains the files that automatically create pages from the markdown files
- **docker**: contains dockerfile to build and use container to develop and test website
- **content**: contains all the markdown files that make up the content (it is a submodule based off the biodynamo repo)

The paths that will be used in this repository are all relative and follow the configuration set by `gatsby-source-filesystem`.
*The directories indicated in this plugin can be considered as root.*

For example, a file located within the `public` or `content` directories, only has for path: `/file_inside_of_named_directory`

### How to Build or Develop the Website

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
`*lock*` files should be deleted as they often create problems when rebuilding or redeveloping.

## Markdown Based Pages

Markdown files can be used to create pages such as in the user guide and dev guide.
To do so a gatsby plugin was used (gatsby-transformer-sharp, as seen in `gatsby-config.js`).
The `gatsby/` directory contains the javascript files that automatically generate the markdown files into pages.

To create and add new markdown pages or update existing ones, the site needs to be rebuilt and the markdown files must follow the guidelines below. Additionally all markdown files should be added to the `content/` directory for consistency and proper file management set in `gatsby-config.js` with the source file system plugin.

### Using Frontmatter

All pages created with markdown files need frontmatter.
This frontmatter helps dictate which section the particular markdown file belongs to (user guide, dev guide, etc).
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
The title of the markdown based page will be automatically created using the *title* field in the frontmatter.
The *path* field in the frontmatter is important as it allows us to use a custom path instead of the path of the working directory.
Furthermore, toc and sidebar are important for the layout and placement of the markdown based page in the website.
The `toc` section dictates whether there should be a table of content on the right hand side of the page, the possible values are: true, false or null (null will considered as true).
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

The layout for pages using markdowns can be found in `src/templates/markdown/post.js`.
The header for these pages are configured in `src/utils/getPostHeaderConfig.js` and the component that builds the header can be found in `src/components/common/PostHeader.js`.
Excluding the previously mentioned header, the rest of the page layout can be found in `src/components/layout`, this is the general website layout.

## Javascript Pages

There are three main javascript pages: home, about and gallery pages.
The documentation page is a just a simple landing page made to direct the user towards one of the three available guides.

### Home Page

The home page is the file `src/pages/index.js`, it follows the standard website layout.
All the components visible to this page can be found in the `src/components/home/` directory.

The `src/components/home/HomeHeader.js` file configures the text, links and display of the header.
In this components file, it is possible to change the name of the header of the page (inside the h1 tag), to change the name of the sub-header (inside the h2 tag) and to edit the three main boxes that appear on the home page.
The component of these boxes is called `HomeHeaderBox`, it needs a link, a title, an icon and a color.
For the github link box, a `target` input was added to open the github repository on a different tab.

The `src/components/home/Carousel.js` configures the image carousel seen on the home page.

The `src/components/home/BlogList.js` configures the settings and query for the news feed on the home page.
The maximum number of articles displayed can be modified on the `index.js` file itself.
It is configured with the `limit` input inside the `BlogList` tag.
The graphql query enables us to use the beginning excerpt of any markdown file that appears on our list.
The `(pruneLength: )` command next to excerpt allows us to choose the amount of characters that should be displayed.
This query also pulls the markdown files from newest to oldest, so that newer articles appear first.
The directory from which the files are pulled from are handled by the `filter: {fields: {slug: {regex: "/directory/of/news/"}}}` input on the query.
This query is then used to return an html element that creates a link to the markdown file article and displays the file's title, date and the short excerpt.

### Documentation Landing Page

This landing page is the `src/pages/documentation.js` file, it is a simple with a large sized header and three box elements.
The component for the boxes is called `SetupBox`, it requires a link (either "href" or "to"), a title, an icon, iconClass and headingClass.
These are used to format the main elements of the box.
The component can be further edited in `src/components/setup/SetupBox.js`.

### Gallery Page

This page is the `src/pages/gallery.js` file, it consists of multiple rows of three boxes.
Each box represents a demo with its own image, description and title.
These boxes are made from the `GalleryBox` component and it can be found in the `src/components/gallery/GalleryBox.js` file.
Each gallery box needs a link (either "href" or "to"), a title and the image path.
The description for the box can be done inside of a paragraph html tag as a child element of the gallery box.
The number of boxes is dictated by the number of `GalleryBox` elements there are in the `gallery.js` file.
Styling (size of boxes, color, etc) for the gallery box and its contents can be found in the `src/styles/custom.css` file.

### About Page

This page is the `src/pages/about.js` file, it consists of headers, paragraph section and boxes for the team members.
The project description can be edited in the paragraph element underneath the "Our Project" header (h2).
The boxes for each team member are constructed by the `MemberBox` component, it can be found at `src/components/common/team/MemberBox.js`.
These boxes need a link (href), a name, the image path (src), headingClass and position inputs.
As they suggest, the name and position inputs refer to the name and position of the team member.
The number of boxes can be changed by adding or removing `MemberBox` elements.
Styling (color, size, etc) for the name and position image overlays can be found in the `src/styles/custom.css` file.

## Search Functionality

To implement a search functionality for the website Lunr.js was used.
This functionality has a docs/demo that can be found at [Lunr](https://lunrjs.com/) and the source code in this [repository](https://github.com/olivernn/lunr.js).
This search was integrated to the website through the `gatsby-plugin-lunr`.
Reference and documentation for the plugin can be found in this [repository](https://github.com/humanseelabs/gatsby-plugin-lunr).

The search component of the website can be found in the `src/components/common/search/` directory.
All the layout/configuration of the search bar and pop up itself are done by `SearchWrapper.js`, `SearchInput.js` and `SearchModal.js`.
The component using Lunr to fetch the results of queries can be found in `Search.js`.

### Configuring the Lunr Search

In the `gatsby-config.js` file, it is necessary to configure our search plugin.
The configuration helps us automatically generate the searchable index that is used by Lunr.

**Important, we must rebuild our website every time we make changes to it to update the search index.**

The Lunr plugin is implemented with the following code snippet (added to our list of plugins):
```javascript
{
    resolve: `gatsby-plugin-lunr`,
    options: {
        languages: [
            {
                // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
                name: 'en',
                filterNodes: (node) => !isNil(node.frontmatter),
                plugins: [myAddedPlugin]
            }
        ],
        // Fields to index. If store === true value will be stored in index file.
        // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        fields: [
            { name: 'title', store: true, attributes: { boost: 20 } },
            { name: 'description' },
            { name: 'content', store: true },
            { name: 'path', store: true },
            { name: 'sidebar', store: true },
            { name: 'headings' },
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
            // For any node of type MarkdownRemark, list how to resolve the fields' values
            MarkdownRemark: {
                title: node => node.frontmatter.title,
                description: node => node.frontmatter.meta_description,
                content: node => node.rawMarkdownBody,
                path: node => node.fields.slug,
                sidebar: node => node.frontmatter.sidebar,
                headings: node => node.headings,
            },
        },
        //custom index file name, default is search_index.json
        filename: 'search_index.json',
    },
},
```
The *languages* section is where we set which language we want our search queries to be in (Lunr can handle multi-language search queries).
In this *languages* section, we can also add plugins for lunr by creating a field called `plugins: [list,of,plugins]`.

Once the *languages* option has been configured, the searchable fields must be added.
To add a field, we must give it a name and tell it whether to store it in the index or not.
This is done as shown above.
We can also "boost" it to give certain fields higher precedence over others.
The fields stored as true for our website are necessary.
They are used to create display titles (title field), parse and group results (sidebar field) and link to the results (path field).

Next, we must point each field to the correct qraphql query as done above.
To check the correct qraphql query it is helpful to open the GraphiQL tool while in developing the website (usually found at http://localhost:8000/___graphql).
The *node* object here represents `allMarkdownRemark.edges.node`.

Finally, we give the search index a file name as indicated above.

The additional plugin created was to remove the lunr stemmer and whitelist the position metadata.
The position metadata is important as it helps us build the snippet displayed when doing a search query.
This is done by creating the constant below:
```javascript
const myAddedPlugin = (lunr) => (builder) => {

  // removing stemmer
  builder.pipeline.remove(lunr.stemmer)
  builder.searchPipeline.remove(lunr.stemmer)

  // whitelist position metadata of search result
  builder.metadataWhitelist = ['position']
  // adjust similarity tuning
  builder.k1(0.75)
  builder.b(0.5)
}
```
More info on [similarity tuning](https://lunrjs.com/guides/customising.html#similarity-tuning).

### Search Component

The `Search.js` files contains multiple functions that helps fetch, display and process search results.

The `getSearchResults` function is the one that returns our array of results for the search.
The query that is generated undergoes multiple processing stages:

1. The data is searched using the `const searchResults = window.__LUNR__.en.index.search(query + "^100 " + query + "~1^5 " + query + "*^15")` command.
The input for the search can be translated as: search for query (with importance 100) or query (with edit distance of 1, importance 5) or query (with wildcard ending, importance of 15).
This allows us to do some fuzzy searching of our website.
An important thing to note is that this query returns to us the references of the documents in which a match was found along with the metadata of the search query.

2. The search results are now processed by the `const flat_lunr_results = searchResults.map(({ ref }) => window.__LUNR__.en.store[ref])` command to get the proper names, paths, sidebars, etc, of the documents containing search matches.
Now our results will display title, path, sidebar and content of the document that contained a match.

3. In this step, we create the `added_position` array to add the position metadata from our search results to the results array.
We also set up an if statement to skip any html that was matched with our query.

4. Now the results are grouped by section using the *sidebar* field (`grouped_by_sidebar` array).
We also remove any duplicate groups that may have been created (`unique` array).

5. The results are now returned as the final `results` array.
It is possible to choose how many results we want to display per section with `max_num_results`.

The other functions within the `Results` react component either pass the input to the query or pass the search results to the display template (`HitTemplate`).

The `HitTemplate` also process the results multiple times for display.
It uses the strip-markdown plugin to get rid of unnecessary markdown elements in the search result snippet.
The steps that occur in this function are:

1. We use an *if else* to check whether a hit occurred in the title or the content of the document.

2. We use the position metadata and the *content* or *title* fields from the result array to construct our search result snippet.
This process is done by taking 30 characters prior and after the matched result using conditionals to not go out of boundaries.

3. Finally, once the results array has been processed and our snippets constructed, the `HitTemplate` will display the title of the document and the search result snippet with the matched elements in bold.
This small display will also link to the document using the *path* field from the results array.

*For more specific details on the processing look at the source code*

## Copyright & License

Copyright (c) 2018-2019 Ghost Foundation - Released under the [MIT license](LICENSE).
