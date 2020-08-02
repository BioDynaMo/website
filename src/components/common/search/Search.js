import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Autosuggest from 'react-autosuggest'
import { Spirit } from '../../../styles/spirit-styles'

const HitTemplate = ({ hit }) => {

    var remark = require('remark') // needed for strip-markdown plugin
    var strip = require('strip-markdown') // strip-markdown plugin
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
            pre_dots = "..." // there is text before so we add dots
        } else if(start!=0) {
            var fluff_start = 0
        }

        if ((start+str_length+plus) < Object.keys(hit.content).length) { // check if we go too far forward
            var fluff_end = plus
            post_dots ="..." // there is text afterwards so add dots
        } else {
            var fluff_end = Object.keys(hit.content).length-start-str_length
        }

        if (start == 0){ // no material before highlighted section if its the beginning of the document
            var before_fluff = ""
        } else {
            var before_fluff = hit.content.substr(fluff_start,start-fluff_start) // part of the snippet before the search result
            before_fluff = before_fluff.replace(/#/g,"") // All of these replace functions help get rid of some extra unwanted syntax in the search result snippet
            before_fluff = before_fluff.replace(/`/g,"")
            before_fluff = before_fluff.replace(/\[/g,"")
            before_fluff = before_fluff.replace(/\]/g,"")
            before_fluff = before_fluff.replace(/\//g,"")
            before_fluff = before_fluff.replace("\\","")
        }

        if (fluff_end != plus) {
            var after_fluff = ""
        } else {
            var after_fluff = hit.content.substr(start+str_length+1, fluff_end) //part of the snippet after the search result
            after_fluff = after_fluff.replace(/#/g,"") // All of these replace functions help get rid of some extra unwanted syntax in the search result snippet
            after_fluff = after_fluff.replace(/`/g,"")
            after_fluff = after_fluff.replace(/\[/g,"")
            after_fluff = after_fluff.replace(/\]/g,"")
            after_fluff = after_fluff.replace(/\//g,"")
            after_fluff = after_fluff.replace("\\","")
        }

        remark() // start strip markdown
          .use(strip)
          .process(before_fluff, function(err, file) { // use strip markdown plugin
            if (err) throw err
            before_fluff = String(file) // put the stripped string into our snippet
          })

        remark() // start strip markdown
          .use(strip)
          .process(after_fluff, function(err, file) { // use strip markdown plugin
            if (err) throw err
            after_fluff = String(file) // put the stripped string into our snippet
          })


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

        if (start == 0){
            var before_fluff = ""
        } else {
            var before_fluff = hit.title.substr(fluff_start,minus) // part of the snippet before the search result
            before_fluff = before_fluff.replace(/#/g,"")
            before_fluff = before_fluff.replace(/`/g,"")
        }

        if (fluff_end+start+str_length+1 == Object.keys(hit.title).length) {
            var after_fluff = ""
        } else {
            var after_fluff = hit.title.substr(start+str_length+1, fluff_end) //part of the snippet after the search result
            after_fluff = after_fluff.replace(/#/g,"")
            after_fluff = after_fluff.replace(/`/g,"")
        }


    }
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
            searchResults: [], // this is our search results
            value: "", // this is our query value
        }

        this.onChange = this.onChange.bind(this) // needed binding for react class
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
        this.getSuggestionValue = this.getSuggestionValue.bind(this)
        this.renderSuggestion = this.renderSuggestion.bind(this)
        this.renderSectionTitle = this.renderSectionTitle.bind(this)
        this.getSectionSuggestions = this.getSectionSuggestions.bind(this)
    }

    onChange(event, { newValue }) {

        this.setState(() => {
            return { value: newValue }
        })
    }

    onSuggestionsFetchRequested({ value }) {

        const results = this.getSearchResults(value)
        this.setState({ searchResults: results })

    }

    onSuggestionsClearRequested() {

        this.setState(() => {
            return { value: "" }
        })
    }

    getSuggestionValue(hit) {

        return hit.title
    }

    renderSuggestion(hit) {

        if (!hit.title || hit.sidebar=="data-schema-stub" || !hit.sidebar) return // if no title or sidebar return blank
        return <HitTemplate hit={hit} />
    }

    renderSectionTitle( hits ) {

        var index = "" // setting up section names
        if (hits.sidebar=="userguide") index = `User Guide`
        if (hits.sidebar=="devguide") index = `Dev Guide`
        if (hits.sidebar=="api") index = `API`

        const labelClass = { // set color her
            // faq: `faq-color b--faq-color`,
            // concept: `concept-color b--concept-color`,
            devguide: `concept-color b--concept-color-color`,
            api: `middarkgrey b--middarkgrey`,
            userguide: `tutorial-color b--tutorial-color`,
            // integration: `integration-color b--integration-color`,
            // blog: `concept-color b--concept-color`,
            // marketplace: `setup-color b--setup-color`,
        }

        if (!hits.sidebar || hits.sidebar == "data-schema-stub") return <span></span>
        return <span className={`br-pill bg-white ba pa1 pl2 pr2 nowrap ${labelClass[hits.sidebar] || `midgrey b--midgrey`}`}>{index}</span>
    }

    getSectionSuggestions(hits) {

        return hits.flat_lunr_results
    }

    getSearchResults(query) {

        if (!query || !window.__LUNR__) return [] // query empty or lunr not working return no results

        const searchResults = window.__LUNR__.en.index.search(query + "^100 " + query + "~1^5 " + query + "*^15") // get results, exact wording or fuzzy or wildcard
        const flat_lunr_results = searchResults.map(({ ref }) => window.__LUNR__.en.store[ref]) // get correct naming

        const added_position = flat_lunr_results.map((rez,index) => {
            // blacklisting of html tags in markdown docs
            if (Object.entries(searchResults[index].matchData.metadata)[0][0]=="div" ||
                Object.entries(searchResults[index].matchData.metadata)[0][0] == "href" ||
                Object.entries(searchResults[index].matchData.metadata)[0][0] == "a" ||
                Object.entries(searchResults[index].matchData.metadata)[0][0] == "p" ||
                Object.entries(searchResults[index].matchData.metadata)[0][0]=="br" ||
                Object.entries(searchResults[index].matchData.metadata)[0][0]=="target=\"_blank" ||
                Object.entries(searchResults[index].matchData.metadata)[0][0]=="class=\"sbox") {

                return { // We return an empty string when these specific values are found
                    path: "",
                    sidebar:"",
                    title:"",
                    pos: "",
                    content: "",
                }
            } else {
                // return the result values as expected
                return {
                    path: rez.path,
                    sidebar:rez.sidebar,
                    title:rez.title,
                    pos: Object.values(searchResults[index].matchData.metadata),
                    content: rez.content,
                }
            }
        });
        // group everything by section
        const grouped_by_sidebar = added_position.map(section => {
            // this is the format of the array
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

        // return the final processed results
        return results
    }

    render() {

        const hits = this.state.searchResults
        const { value } = this.state

        const inputProps = {
            placeholder: `Search...`,
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



const AutoComplete = Results

export default AutoComplete
