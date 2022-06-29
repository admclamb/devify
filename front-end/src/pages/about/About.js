import Card from '../../components/card/Card';
import styles from './About.module.css';
const About = () => {
  return (
    <div className="container">
      <Card padding="p-4">
        <h2>About Devify</h2>
        <p>
          This application was a self made recreation of{' '}
          <a href="https://dev.to/" className={styles.link}>
            Dev.to
          </a>{' '}
          website. This was made to build my full stack web development skills
          and create something very difficult.
        </p>

        <p>
          If you haven't check out{' '}
          <a href="https://dev.to/" className={styles.link}>
            Dev.to
          </a>{' '}
          please do so!{' '}
        </p>
      </Card>
    </div>
  );
};

export default About;
