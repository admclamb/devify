import './FormatPost.css';

const formatInsideLine = (line, index) => {
  const options = ['**', '__'];
  let output = [];
  let currString = '';
  let currOption = null;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    if (currOption === '**' && char + nextChar === '**') {
      console.log('in here');
      output.push(<b>{currString}</b>);
      currOption = null;
      currString = '';
      i++;
    } else if (currOption === '__' && char + nextChar === '__') {
      output.push(<i>{currString}</i>);
      currOption = null;
      currString = '';
      i++;
    } else if (currOption) {
      currString += char;
    } else {
      if (char + nextChar === '**') {
        output.push(currString);
        currString = '';
        currOption = '**';
        i++;
      } else if (char + nextChar === '__') {
        output.push(currString);
        currString = '';
        currOption = '__';
        i++;
      } else {
        currString += char;
      }
    }
  }
  if (currString.length > 0) {
    output.push(currString);
  }
  return <p key={index}>{output}</p>;
};

/**
 * Checks to see if first two characters are formatting
 * characters such as ## ** __
 */

const formatLine = (line, index) => {
  if (line[0] + line[1] === '##') {
    return <h3 key={index}>{line.slice(2)}</h3>;
  } else {
    return formatInsideLine(line, index);
  }
};

const FormatPost = ({ post }) => {
  return (
    (
      <section className="format-post">
        {post.split('\n').map((line, index) => formatLine(line, index))}
      </section>
    ) || null
  );
};

export default FormatPost;
