import Image from 'next/image';
import csl from './Author.module.css';
import author from '@/shared/assets/photo/author.jpg';

export const Author = () => {
  return (
    <div className={csl.author}>
      <h2>About the author</h2>
      <div className={csl.content}>
        <div className={csl.photo}>
          <Image priority src={author} alt="author" width={150} height={200} />
        </div>
        <div className={csl.text}>
          <h3>Uladzimir Hancharou</h3>
          <p>
            Frontend developer with experience in creating modern web
            applications on React.
          </p>
          <p>
            Aspiring React developer with foundational knowledge of JavaScript,
            HTML, and CSS. Gained experience through personal projects and
            online courses. Eager to develop skills in web application
            development and learn new technologies. Confident in my ability to
            work in a team and quickly adapt to new tools.
          </p>
        </div>
      </div>
    </div>
  );
};
