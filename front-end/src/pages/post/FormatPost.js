import './FormatPost.css';

const formatInsideLine = (line, index) => {
  const options = ['**', '__'];
  let output = '';
  let currString = '';
  let currOption = null;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    if (currOption === '**' && char + nextChar === '**') {
      output += <b>{currString}</b>;
      currOption = null;
      currString = '';
      i++;
    } else if (currOption === '__' && char + nextChar === '__') {
      output += <i>{currString}</i>;
      currOption = null;
      currString = '';
      i++;
    } else if (currOption) {
      currString += char;
    } else {
      if (char + nextChar === '**') {
        currOption = '**';
        i++;
      } else if (char + nextChar === '__') {
        currOption = '__';
        i++;
      } else {
        output += char;
      }
    }
  }
  return <p key={index}>{output}</p>;
};

const formatLine = (line, index) => {
  const postFormats = ['##', '__', '**'];
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
