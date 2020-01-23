import React, { useRef, useEffect } from 'react';
import styles from './Page.module.scss';
import { useSiteMetadata, authorDetails, fetchPosts } from '../../hooks';

type Props = {
  title?: string,
  children: React.Node
};

const spanCSS = {
  float: 'right',
  paddingLeft:'10px',
  paddingRight:'10px'
};

const h2Style = {
  marginTop:'0px',
  paddingLeft:'10px',
  paddingRight:'10px'
};

const aCSS = {
  paddingLeft: '5px',
  fontWeight: '550'
};

function mostRewardedAuthors (postResults) {
  var authors = {};
  postResults.forEach(item => {
    var pending_payout_value = 0;
    var total_payout_value = 0;
    var sum_payout = 0;
    const current_item = item.node.frontmatter;

    if ((current_item.hasOwnProperty('pending_payout_value')) && (current_item.hasOwnProperty('total_payout_value'))) {
      total_payout_value = parseInt((current_item.total_payout_value).replace(" SMOKE", ""));
      pending_payout_value = parseInt((current_item.pending_payout_value).replace(" SMOKE", ""));
      sum_payout = total_payout_value + pending_payout_value;
    }

    if (current_item.author in authors) {
      authors[current_item.author] += sum_payout;
    } else {
      authors[current_item.author] = sum_payout;
    }
  });

  const medals = {'1': "🥇", '2': "🥈", '3': "🥉"};
  var sorted_authors = Object.keys(authors).sort(function(a,b){return authors[b]-authors[a]});

  let response = [];
  sorted_authors.forEach((sorted_author, i) => {
    if (i < 100) {
      if (i < 3) {
        response.push(<span style={h2Style}>{medals[(i+1).toString()] + " "}</span>)
      } else {
        response.push(<span style={h2Style}>{i+1 + " "}</span>)
      }
      response.push(<a href={"/" + sorted_author} style={aCSS}>{sorted_author.toUpperCase()}</a>);
      response.push(<span style={spanCSS}> {authors[sorted_author]} SMOKE</span>);
      response.push(<br/>);
    }
  })
  return response;
}

function mostFeaturedAuthors (postResults) {
  var authors = {};
  postResults.forEach(current_item => {
    const item = current_item.node.frontmatter;
    if (item.author in authors) {
      authors[item.author] += 1;
    } else {
      authors[item.author] = 1;
    }
  });

  const medals = {'1': "🥇", '2': "🥈", '3': "🥉"};
  var sorted_authors = Object.keys(authors).sort(function(a,b){return authors[b]-authors[a]});

  let response = [];
  sorted_authors.forEach((sorted_author, i) => {
    if (i < 100) {
      if (i < 3) {
        response.push(<span style={h2Style}>{medals[(i+1).toString()] + " "}</span>)
      } else {
        response.push(<span style={h2Style}>{i+1 + " "}</span>)
      }
      response.push(<a href={"/" + sorted_author} style={aCSS}>{sorted_author.toUpperCase()}</a>);
      response.push(<span style={spanCSS}> {authors[sorted_author]} posts</span>);
      response.push(<br/>);
    }
  })
  return response;
}

function trendingTags (postResults) {
  var tags = {};
  var itr = 0;

  postResults.forEach(current_item => {
    if (itr < 150) {
      const item = current_item.node.frontmatter;
      itr += 1;
      if (item.hasOwnProperty("tags")) {
        item.tags.forEach(tag => {
          if (tag in tags) {
            tags[tag] += 1;
          } else {
            tags[tag] = 1;
          }
        })
      }
    }
  });

  const medals = {'1': "🥇", '2': "🥈", '3': "🥉"};
  var sorted_tags = Object.keys(tags).sort(function(a,b){return tags[b]-tags[a]});

  let response = [];
  sorted_tags.forEach((sorted_tag, i) => {
    if (i < 100) {
      if (i < 3) {
        response.push(<span style={h2Style}>{medals[(i+1).toString()] + " "}</span>)
      } else {
        response.push(<span style={h2Style}>{i+1 + " "}</span>)
      }
      response.push(<a href={"/tag/" + sorted_tag} style={aCSS}>{sorted_tag.toUpperCase()}</a>);
      response.push(<span style={spanCSS}> {tags[sorted_tag]} posts</span>);
      response.push(<br/>);
    }
  })
  return response;
}

function historicalTags (postResults) {
  var tags = {};
  var itr = 0;

  postResults.forEach(current_item => {
    const item = current_item.node.frontmatter;
    if (item.hasOwnProperty("tags")) {
      item.tags.forEach(tag => {
        if (tag in tags) {
          tags[tag] += 1;
        } else {
          tags[tag] = 1;
        }
      })
    }
  });

  const medals = {'1': "🥇", '2': "🥈", '3': "🥉"};
  var sorted_tags = Object.keys(tags).sort(function(a,b){return tags[b]-tags[a]});

  let response = [];
  sorted_tags.forEach((sorted_tag, i) => {
    if (i < 100) {
      if (i < 3) {
        response.push(<span style={h2Style}>{medals[(i+1).toString()] + " "}</span>)
      } else {
        response.push(<span style={h2Style}>{i+1 + " "}</span>)
      }
      response.push(<a href={"/tag/" + sorted_tag} style={aCSS}>{sorted_tag.toUpperCase()}</a>);
      response.push(<span style={spanCSS}> {tags[sorted_tag]} posts</span>);
      response.push(<br/>);
    }
  })
  return response;
}

function getAuthorTags (postResults) {
  let tags = {};
  postResults.forEach(item => {
    item.node.frontmatter.tags.forEach(tag => {
      if (tags[tag]) {
        tags[tag] += 1;
      } else {
        tags[tag] = 1;
      }
    })
  })

  var items = Object.keys(tags).map(function(key) {
    return [key, tags[key]];
  });

  items.sort(function(a, b) {
      return b[1] - a[1];
  });

  let response = [];
  items.forEach((current_tag, i) => {
    if (i < 50) {
      response.push(<a href={"/tag/" + current_tag[0]} className={styles['page__links']}>#{current_tag[0]} </a>);
    }
  })
  return response;
}

function getAuthorPosts (postResults, current_author) {
  let posts = [];
  postResults.forEach(item => {
    const frontmatter = item.node.frontmatter;
    if (frontmatter.author === current_author) {
      posts.push(item);
    }
  })

  let response = [];
  posts.forEach(current_post => {
    const fields = current_post.node.fields;
    const frontmatter = current_post.node.frontmatter;

    response.push(<tr><td><a href={fields.slug} className={styles['page__links']}>{frontmatter.title}</a></td></tr>);
  })

  return response;
}

function getShuffledArr (array){
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}

function getAuthor (authorResult, author_title) {
  let user;
  authorResult.forEach(author => {
    const current_author = author.node.frontmatter;
    if (current_author.title === author_title) {
      user = author.node.frontmatter;
    }
  });
  return user;
}

const authorImg = {
  'maxHeight': '125px',
  'maxWidth': '125px',
  'paddingTop': '8px',
  'float':'left',
  'paddingRight': '10px'
}

const Page = ({ title, children }: Props) => {
  const pageRef = useRef();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  });

  const authorCheck = title && title.includes('profile page');
  const postResults = fetchPosts();

  if (title && title === 'Insights') {
    const mostRewardedAuthorsRes = mostRewardedAuthors(postResults);
    const mostFeaturedAuthorsRes = mostFeaturedAuthors(postResults);
    const trendingTagsRes = trendingTags(postResults);
    const historicalTagsRes = historicalTags(postResults);

    const spanStyle = {
      marginTop: '15px',
      paddingTop: '5px',
      paddingBottom: '10px',
      boxShadow: '2px 3px 3px 3px #8DB98A',
      backgroundColor: 'white'
    };

    return (
      <div ref={pageRef} className={styles['page']}>
        <div className={styles['page__inner']}>
          { title && <h1 className={styles['page__title']}>{title}</h1>}
          <div className={styles['page__body']}>
            <div style={spanStyle}>
              <h2 style={h2Style}>Most rewarded authors</h2>
              {mostRewardedAuthorsRes}
            </div>
            <div style={spanStyle}>
              <h2 style={h2Style}>Most featured authors</h2>
              {mostFeaturedAuthorsRes}
            </div>
            <div style={spanStyle}>
              <h2 style={h2Style}>Trending tags</h2>
              {trendingTagsRes}
            </div>
            <div style={spanStyle}>
              <h2 style={h2Style}>Historical tag usage</h2>
              {historicalTagsRes}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (authorCheck) {
    const authorContents = authorDetails();
    const authorName = title.split("'")[0];
    let authorResult = getAuthor(authorContents, authorName);

    var profile_image = '';
    profile_image = !authorResult.profile_image
                      ? 'https://smoke-indica.com/css/images/smoke_user.webp'
                      : (!profile_image.includes("steemitimages.com") && profile_image !== "/css/images/smoke_user.png")
                        ? "//images.weserv.nl/?url=" + authorResult.profile_image + "&w=100&h=100&output=webp"
                        : 'https://smoke-indica.com/css/images/smoke_user.webp';

    var author_str = (((authorResult.title).slice(0, 1)).toUpperCase() + (authorResult.title).slice(1, ((authorResult.title).length)));
    author_str = author_str.length < 5
                  ? author_str.toUpperCase()
                  : author_str;

    const postResults = fetchPosts();
    const authorTags = getAuthorTags(postResults, authorResult.title);
    const authorPosts = getAuthorPosts(postResults, authorResult.title);
    //const authorResultIMGs = getAuthorPostsImages(postResults, authorResult.title);

    const tdIMG = {
      width: '15%'
    };
    const tdStats = {
      width: '85%'
    }
    const tableStyle = {
      width: '100%'
    }

    return (
      <div ref={pageRef} className={styles['page']}>
        <div className={styles['page__inner']}>
          { title && <h1 className={styles['page__title']}>{title}</h1>}
          <div className={styles['page__divdiv']}>
            <table style={tableStyle}>
              <tr>
                <td style={tdIMG}>
                  <a href={"https://smoke.io/@" + authorResult.title}>
                    <img style={authorImg} src={profile_image} alt={authorResult.title + "'s profile image'"} />
                  </a>
                </td>
                <td style={tdStats}>
                  @<a href={"https://smoke.io/@" + authorResult.title}>{author_str}</a><br/>
                  {authorResult.about_author}<br/>
                  Reputation: <b>{authorResult.reputation}</b> Posts: <b>{authorResult.post_count}</b><br/>
                </td>
              </tr>
            </table>
            <table>
              <tr>
                <td>
                  Tags: {authorTags}
                </td>
              </tr>
              <tr>
                <td>
                  Check out {authorResult.title}'s featured posts:<br/>
                  <table>
                    {authorPosts}
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  } else if (title && (title === "About" || title === "Related sites" || title === "Contact" || title === "Smoke Price")) {
    return (
      <div ref={pageRef} className={styles['page']}>
        <div className={styles['page__inner']}>
          { title && <h1 className={styles['page__title']}>{title}</h1>}
          <div className={styles['page__divdiv']}>
            {children}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div ref={pageRef} className={styles['page']}>
        <div className={styles['page__inner']}>
          { title && <h1 className={styles['page__title']}>{title}</h1>}
          <div className={styles['page__body']}>
            {children}
          </div>
        </div>
      </div>
    );
  }
};

export default Page;
