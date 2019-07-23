import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Autosuggest from 'react-autosuggest'
import { Spirit } from '../../../styles/spirit-styles'

const HitTemplate = ({ hit }) => {

    var remark = require('remark')
    var strip = require('strip-markdown')
    var pre_dots = "" // Value of this variable changes if the snippet is at the beginning of the document or not 
    var post_dots = "" // Value of this variable changes if the snippet is at the end of the document or not 

    if (hit.pos[0].content) { // first we check for a hit in the content of the markdown file
        var start = hit.pos[0].content.position[0][0] // get position metadata from array
        var str_length = hit.pos[0].content.position[0][1] // get length metadata from array 
        var snippet = hit.content.substr(start,str_length+1) // This is the snippet that was found and is highlighted, added plus one due to indexing
        var minus = 30 // snippet pre length 
        var plus = 30 // snippet post length
        if (start-minus>0){ // Check if we go to far back or not 
            var fluff_start = start-minus
            pre_dots = "..."
        } else if(start!=0) {
            var fluff_start = 0
        }
        if ((start+str_length+plus) < Object.keys(hit.content).length) { // check if we go too far forward
            var fluff_end = plus
            post_dots ="..."
        } else {
            var fluff_end = Object.keys(hit.content).length-start-str_length
        }
        if (pre_dots == "" && start == 0){
            var before_fluff = ""
        } else {
            var before_fluff = hit.content.substr(fluff_start,start-fluff_start) // part of the snippet before the search result
            before_fluff = before_fluff.replace(/#/g,"")
            before_fluff = before_fluff.replace(/`/g,"")
            before_fluff = before_fluff.replace(/\[/g,"")
            before_fluff = before_fluff.replace(/\]/g,"")
            before_fluff = before_fluff.replace(/\//g,"")
        }
        if (post_dots == "") {
            var after_fluff = ""
        } else {
            var after_fluff = hit.content.substr(start+str_length+2, fluff_end) //part of the snippet after the search result
            after_fluff = after_fluff.replace(/#/g,"")
            after_fluff = after_fluff.replace(/`/g,"")
            after_fluff = after_fluff.replace(/\[/g,"")
            after_fluff = after_fluff.replace(/\]/g,"")
            after_fluff = after_fluff.replace(/\//g,"")
        }
        remark()
          .use(strip)
          .process(before_fluff, function(err, file) {
            if (err) throw err
            before_fluff = String(file)
          })
        remark()
          .use(strip)
          .process(after_fluff, function(err, file) {
            if (err) throw err
            after_fluff = String(file)
          })
          // console.log(after_fluff)

    } else if (hit.pos[0].title) { // Same process as for content but for title
        var start = hit.pos[0].title.position[0][0]
        var str_length = hit.pos[0].title.position[0][1]
        var snippet = hit.title.substr(start,str_length+1) 
        var minus = 10
        var plus = 20
        if (start-minus>0){
            var fluff_start = start-minus
            pre_dots = "..."
        } else {
            var fluff_start = 0
        }
        if ((start+str_length+plus) < Object.keys(hit.title).length) {
            var fluff_end = plus
            post_dots ="..."
        } else {
            var fluff_end = Object.keys(hit.title).length-start-str_length
        }
        if (pre_dots == ""){
            var before_fluff = ""
        } else {
            var before_fluff = hit.title.substr(fluff_start,minus) // part of the snippet before the search result
            before_fluff = before_fluff.replace(/#/g,"")
            before_fluff = before_fluff.replace(/`/g,"")
        }
        if (post_dots == "") {
            var after_fluff = ""
        } else {
            var after_fluff = hit.title.substr(start+str_length+2, fluff_end) //part of the snippet after the search result
            after_fluff = after_fluff.replace(/#/g,"")
            after_fluff = after_fluff.replace(/`/g,"")
        }


    } //else if (hit.pos[0].description) { // Same process as for content but for description
    //     var start = hit.pos[0].description.position[0][0]
    //     var str_length = hit.pos[0].description.position[0][1]
    //     var snippet = hit.description.substr(start,str_length+1)
    //     if (start-minus>0){
    //         var fluff_start = start-minus
    //         pre_dots = "..."
    //     } else {
    //         var fluff_start = 0
    //     }
    //     if ((start+str_length+plus) < Object.keys(hit.description).length) {
    //         var fluff_end = plus
    //         post_dots ="..."
    //     } else {
    //         var fluff_end = Object.keys(hit.description).length-start-str_length
    //     }
    //     if (pre_dots == ""){
    //         var before_fluff = ""
    //     } else {
    //         var before_fluff = hit.description.substr(fluff_start,minus) // part of the snippet before the search result
    //         before_fluff = before_fluff.replace(/#/g,"")
    //         before_fluff = before_fluff.replace(/`/g,"")
    //     }
    //     if (post_dots == "") {
    //         var after_fluff = ""
    //     } else {
    //         var after_fluff = hit.description.substr(start+str_length+2, fluff_end) //part of the snippet after the search result
    //         after_fluff = after_fluff.replace(/#/g,"")
    //         after_fluff = after_fluff.replace(/`/g,"")
    //     }
    // }
    // console.log(before_fluff)
    // console.log(after_fluff)
    return (
        <>
            
            <Link to={hit.path} className="tdn db pt3 pb3 blue search-result nl5 nr11 pl5 pr11 br3 br--left">
                <h4 className={`${Spirit.h5} dib`}>
                    {hit.title}
                </h4>
                <p className={`${Spirit.small} midgrey nudge-bottom--2`}>
                    {pre_dots}{before_fluff} <strong>{snippet}</strong> {after_fluff}{post_dots}
                </p>
            </Link> 

        </>
    )
}

HitTemplate.propTypes = {
    hit: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
}

class Results extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchResults: [],
            value: "",
        }

        this.onChange = this.onChange.bind(this)
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
        this.getSuggestionValue = this.getSuggestionValue.bind(this)
        this.renderSuggestion = this.renderSuggestion.bind(this)
        this.renderSectionTitle = this.renderSectionTitle.bind(this)
        this.getSectionSuggestions = this.getSectionSuggestions.bind(this)
    }

    onChange(event, { newValue }) {
        // console.log("L onChange")
        this.setState(() => {
            return { value: newValue }
        })
    }

    onSuggestionsFetchRequested({ value }) {
        // console.log("L onSuggestionsFetchRequested ")
        // console.log(value)
        // console.log(window.__LUNR__)
        const results = this.getSearchResults(value)
        this.setState({ searchResults: results })

    }

    onSuggestionsClearRequested() {

        this.setState(() => {
            return { value: "" }
        })
    }

    getSuggestionValue(hit) {
        // console.log("L getSuggestionValue")
        // console.log(hit)

        return hit.title
        // return "suggestions value"
    }

    renderSuggestion(hit) {
        // console.log("renderSuggestion")
        if (!hit.title || hit.sidebar=="data-schema-stub" ) return
        return <HitTemplate hit={hit} />
        // return (<div><br/> <br/><a href={hit.path}> {hit.title} </a></div>)
    }

    renderSectionTitle( hits ) {

        // console.log("renderSectionTitle")
        var index = ""
        if (hits.sidebar=="userguide") index = `User Guide`
        if (hits.sidebar=="devguide") index = `Dev Guide`
        if (hits.sidebar=="bioapi") index = `API`

        const labelClass = {
            // faq: `faq-color b--faq-color`,
            // concept: `concept-color b--concept-color`,
            devguide: `concept-color b--concept-color-color`,
            api: `middarkgrey b--middarkgrey`,
            userguide: `tutorial-color b--tutorial-color`,
            // integration: `integration-color b--integration-color`,
            // blog: `concept-color b--concept-color`,
            // marketplace: `setup-color b--setup-color`,
        }
        // console.log(labelClass[hits.sidebar])
        // console.log(index)
        // console.log(hits)
        if (!hits.sidebar || hits.sidebar == "data-schema-stub") return <span></span>
        return <span className={`br-pill bg-white ba pa1 pl2 pr2 nowrap ${labelClass[hits.sidebar] || `midgrey b--midgrey`}`}>{index}</span>
        // return <span className={`br-pill bg-white ba pa1 pl2 pr2 nowrap ${labelClass[index] || `midgrey b--midgrey`}`}>FOOBAR1</span>
    }

    getSectionSuggestions(hits) {
        // console.log("getSectionSuggestions")
        // console.log(hits)
        
        return hits.flat_lunr_results
    }

    getSearchResults(query) {

        if (!query || !window.__LUNR__) return []
        const searchResults = window.__LUNR__.en.index.search(query + "^100 " + query + "~1^5 " + query + "*^15")
        // console.log(Object.values(searchResults[3].matchData))
        // console.log(query + "*^10 " + query + "~1^1 " + query + "^100")
        // console.log(window.__LUNR__.en.store)
        const flat_lunr_results = searchResults.map(({ ref }) => window.__LUNR__.en.store[ref])

        const added_position = flat_lunr_results.map((rez,index) => {
            if (Object.entries(searchResults[index].matchData.metadata)[0][0]=="div" || Object.entries(searchResults[index].matchData.metadata)[0][0] == "href" || Object.entries(searchResults[index].matchData.metadata)[0][0] == "a" || Object.entries(searchResults[index].matchData.metadata)[0][0] == "p" || Object.entries(searchResults[index].matchData.metadata)[0][0]=="br") {
                return {
                    description: "",
                    path: "",
                    sidebar:"",
                    title:"",
                    pos: "",
                    content: "",
                    // ishtml:Object.entries(searchResults[index].matchData.metadata)[0][0]
                }
            } else {
                return {
                    description: rez.description,
                    path: rez.path,
                    sidebar:rez.sidebar,
                    title:rez.title,
                    pos: Object.values(searchResults[index].matchData.metadata),
                    content: rez.content,
                    // ishtml:Object.entries(searchResults[index].matchData.metadata)[0][0]
                }
            }
        });
        console.log(added_position)
        const grouped_by_sidebar = added_position.map(section => {
            return {
              sidebar: section.sidebar,
              flat_lunr_results: added_position.filter(hit => section.sidebar == hit.sidebar)
            };
          }).filter(section => section.flat_lunr_results.length > 0);

        // remove duplicates
        // https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
        const unique = grouped_by_sidebar.reduce(function(a,b){
          if(a.map(function(e) { return e.sidebar; }).indexOf(b.sidebar)<0) {
            a.push(b)
          };
          return a;
        },[])

        // limit number of results per category
        const max_num_results=3
        const results = unique.map(section => {
          return {
            sidebar: section.sidebar,
            flat_lunr_results: section.flat_lunr_results.slice(0, max_num_results)
          };
        })

        // console.log(searchResults)
        // console.log(Object.entries(searchResults[0].matchData.metadata)[0][0])
        // console.log(added_position)
        // console.log(grouped_by_sidebar)
        // console.log(results)

        return results
    }

    render() {

        const hits = this.state.searchResults
        // const hits = [{"slug":"migrating-to-digitalocean","title":"How we migrated 30,000 blogs & 400,000 users across an ocean with zero downtime","html":"<p>The first step was to create an inventory of what was currently running on our servers.</p><p>Every system administrator knows what software is running in their datacenter, but I don't know anyone who could replicate the configuration of multiple servers by heart. Including me. So we needed to gather all of the important (and maybe unimportant) information about our servers.</p><p>We introduced a configuration management system to keep track of installed software packages, firewall settings and configuration itself. Our weapon of choice here is <a href=\"http://saltstack.com/\">Saltstack</a>. The added benefit of doing this now is that we won't ever need to dig through the servers to find out what our configuration looks like in the future.</p><p>I don’t have particularly strong feelings one way or the other when it comes to configuration management tools. It needs to get the job done and blend in with our overall philosophy of not being overloaded. Saltstack does that for us and it hasn’t let us down. The infrastructure repository contains about 150 salt state files and holds all the information needed (without passwords, of course) to set up <strong>Ghost(Pro)</strong>.</p><p>Although setting up Saltstack took some time, it's already shown its power. It took about a month to set up the first complete clone of the whole network. The second iteration only took one week. When I started to do the third installation of what would become our new hosted platform it only took me 2 days to have 20 servers deployed and ready.</p><p>Formalising our setup also surfaced a lot of small parts that need improvement which I added to our list of refactoring tasks.</p><p>Another thing we found to speed up managing our infrastructure was <a href=\"http://docs.saltstack.com/en/latest/topics/cloud/\">Salt-cloud</a>. It proved to be a really important tool for starting, stopping and deploying servers within minutes. It integrates closely with <a href=\"https://developers.digitalocean.com/\">DigitalOcean's API</a> and allows us to manage the infrastructure from the command line.</p>","image":"https://images.unsplash.com/photo-1504711988183-b5f6f0b1cb8a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&s=2760b966a67ec69c138b60a5c450f6e7","tags":[{"name":"Inside Ghost","slug":"inside-ghost"},{"name":"#devblog","slug":"hash-dev-blog"},{"name":"#blog","slug":"hash-blog"}],"section":"blog","url":"https://ghost.org/blog/migrating-to-digitalocean/#inventory","headings":["Inventory"],"anchor":"inventory","customRanking":{"position":17,"heading":80},"objectID":"Ghost__Post__5cf5f94b3a5f1b0038cc70a1_1","_snippetResult":{"html":{"value":"started to do the third <ais-highlight-0000000000>installation</ais-highlight-0000000000> of what would become","matchLevel":"full"}},"_highlightResult":{"title":{"value":"How we migrated 30,000 blogs & 400,000 users across an ocean with zero downtime","matchLevel":"none","matchedWords":[]},"html":{"value":"<p>The first step was to create an inventory of what was currently running on our servers.</p><p>Every system administrator knows what software is running in their datacenter, but I don't know anyone who could replicate the configuration of multiple servers by heart. Including me. So we needed to gather all of the important (and maybe unimportant) information about our servers.</p><p>We introduced a configuration management system to keep track of installed software packages, firewall settings and configuration itself. Our weapon of choice here is <a href=\"http://saltstack.com/\">Saltstack</a>. The added benefit of doing this now is that we won't ever need to dig through the servers to find out what our configuration looks like in the future.</p><p>I don’t have particularly strong feelings one way or the other when it comes to configuration management tools. It needs to get the job done and blend in with our overall philosophy of not being overloaded. Saltstack does that for us and it hasn’t let us down. The infrastructure repository contains about 150 salt state files and holds all the information needed (without passwords, of course) to set up <strong>Ghost(Pro)</strong>.</p><p>Although setting up Saltstack took some time, it's already shown its power. It took about a month to set up the first complete clone of the whole network. The second iteration only took one week. When I started to do the third <ais-highlight-0000000000>installation</ais-highlight-0000000000> of what would become our new hosted platform it only took me 2 days to have 20 servers deployed and ready.</p><p>Formalising our setup also surfaced a lot of small parts that need improvement which I added to our list of refactoring tasks.</p><p>Another thing we found to speed up managing our infrastructure was <a href=\"http://docs.saltstack.com/en/latest/topics/cloud/\">Salt-cloud</a>. It proved to be a really important tool for starting, stopping and deploying servers within minutes. It integrates closely with <a href=\"https://developers.digitalocean.com/\">DigitalOcean's API</a> and allows us to manage the infrastructure from the command line.</p>","matchLevel":"full","fullyHighlighted":false,"matchedWords":["installation"]},"tags":[{"name":{"value":"Inside Ghost","matchLevel":"none","matchedWords":[]}},{"name":{"value":"#devblog","matchLevel":"none","matchedWords":[]}},{"name":{"value":"#blog","matchLevel":"none","matchedWords":[]}}],"url":{"value":"https://ghost.org/blog/migrating-to-digitalocean/#inventory","matchLevel":"none","matchedWords":[]},"headings":[{"value":"Inventory","matchLevel":"none","matchedWords":[]}]}}]
        // console.log(hits)
        const { value } = this.state
        const inputProps = {
            placeholder: `Search documentation...`,
            onChange: this.onChange,
            value,
            autoFocus: true,
            "data-cy": `search-input`,
        }

        const inputTheme = `input-reset form-text b--transparent search-modal-field-bg br-pill flex-auto whitney lh-normal pa2 pl8 plr3 w-100 dark-placeholder`

        const theme = {
            input: inputTheme,
            inputOpen: inputTheme,
            inputFocused: inputTheme,
            suggestionsContainerOpen: `pa11 pt3 pb3 mt10 bt b--whitegrey nl10 nr10 nb10 search-modal-result-container`,
            suggestionsList: `list pa0 ma0 pt1 search-modal-suggestion-list flex-auto ml11`,
            sectionContainer: `pb4`,
            sectionTitle: `f8 lh-h4 fw5 midgrey w30 tr mt2 sticky top-2 pr2`,
        }
        // console.log(hits)
        return (
            <>
                <Autosuggest
                    suggestions={hits}
                    multiSection={true}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    theme={theme}
                    renderSectionTitle={this.renderSectionTitle}
                    getSectionSuggestions={this.getSectionSuggestions}
                />
            </>
        )
    }
}

Results.propTypes = {
    // hits: PropTypes.arrayOf(
    //     PropTypes.object.isRequired,
    // ).isRequired,
    // currentRefinement: PropTypes.string.isRequired,
    // refine: PropTypes.func.isRequired,
}

const AutoComplete = Results

export default AutoComplete