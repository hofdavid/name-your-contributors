'use strict'

const graphql = require('./graphql')
const queries = require('./queries')

/** Returns all contributions to a repo.
  * @param token  - GitHub auth token
  * @param user   - Username to whom the repo belongs
  * @param repo   - repo name
  * @param before - only return contributions before this timestamp
  * @param after  - only return contributions after this timestamp
  */
const repoContributors = ({token, user, repo, before, after}) =>
      graphql.executequery(token, queries.repository(repo, user))
      .then(json => queries.cleanRepo(token, json.repository, before, after))

/** Returns a list of names of all repos belonging to user. */
const userRepoNames = ({token, login}) =>
      graphql.executequery(token, queries.userRepos(login))
      .then(x => queries.cleanUserRepos(token, x))

/** Returns contributions to all repos owned by orgName.
  * @param token   - GitHub auth token
  * @param orgName - Name of organization
  * @param before  - only return contributions before this timestamp
  * @param after   - only return contributions after this timestamp
  */
const orgContributors = ({token, orgName, before, after}) =>
      graphql.executequery(token, queries.orgRepos(orgName))
      .then(data => queries.cleanOrgRepos(token, data, before, after))

module.exports = {
  repoContributors,
  orgContributors,
  userRepoNames
}