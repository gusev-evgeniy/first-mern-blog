import React from 'react'
import {withRouter} from 'react-router-dom';

 const SearchSection = ({match}) => {
   const tag = match.params.tag
  return (
    <div>
      {tag}
    </div>
  )
}

export default withRouter(SearchSection)