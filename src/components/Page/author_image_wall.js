function getAuthorPostsImages (postResults, current_author) {

  let posts = [];
  postResults.forEach(item => {
    const frontmatter = item.node.frontmatter;
    if (frontmatter.author === current_author) {
      posts.push(item);
    }
  })

  let k = 0;
  let tdRes = [];
  posts.forEach((current_post, i) => {
    if (i < 10) {
      const fields = current_post.node.fields;
      const frontmatter = current_post.node.frontmatter;
      const post_img = fields.images
                        ? fields.images.length
                          ? "//images.weserv.nl/?url=" + fields.images[Math.floor(Math.random()*fields.images.length)] + "&h=45&output=webp&we"
                          : "/photo.jpg"
                        : "/photo.jpg";

      if (k === 0) {
        tdRes.push(<tr>);
        tdRes.push(
          <td><a href={fields.slug}><img src={post_img}/></a></td>
        );
        k = 1;
      } else {
        tdRes.push(
          <td><a href={fields.slug}><img src={post_img}/></a></td>
        );
        tdRes.push(</tr>);
        k = 0;
      }
    }
  })

  return tdRes;
}
