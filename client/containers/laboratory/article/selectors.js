import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
const laboratoryArticleSelector = createSelector(
  pageSelector,
  (page) => page.get('laboratoryArticle')
)


// info
export const articleSelector = createSelector(
  laboratoryArticleSelector,
  (data) => data.get('article')
)



export default createStructuredSelector(
  {
    article: articleSelector,

  }
)
