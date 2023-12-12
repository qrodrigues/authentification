
import TopArticle from "./TopArticle/TopArticle";
import "./TopArticlesList.scss";

function TopArticlesList() {

  const articles = [
    {
      title: "Apprendre à coder avec SINGH",
      content: "Découvrez les secrets du codage avec SINGH. Plongez dans le monde fascinant du développement et maîtrisez les langages avec facilité.",
      link: "articles/1"
    },
    {
      title: "ChatGPT pour les nuls",
      content: "Explorez les bases de ChatGPT, l'IA conversationnelle révolutionnaire. Apprenez à tirer le meilleur parti de cette technologie puissante.",
      link: "articles/2"
    },
    {
      title: "Les meilleures fraudes de 2023",
      content: "Explorez les fraudes les plus sophistiquées de l'année 2023. Découvrez les tactiques et les mesures de prévention pour rester en sécurité.",
      link: "articles/3"
    },
    {
      title: "La cybersécurité avec M. Cervelle",
      content: "Plongez dans le monde de la cybersécurité avec M. Cervelle. Découvrez les dernières menaces en ligne et comment protéger efficacement vos données.",
      link: "articles/4"
    },
    {
      title: "Faire une boucle for (Impossible)",
      content: "Maîtrisez la boucle for, même si elle semble impossible. Découvrez des astuces et des conseils pour surmonter les défis de la programmation.",
      link: "articles/5"
    }
  ];


  return (
    <>
      <div className="top_blog">
        <h2>Les meilleurs articles <i className="fa-regular fa-star"></i></h2>
        {articles.map((article, index) => (
          <TopArticle article={article} key={index} />
        ))}
      </div>
    </>
  )
}

export default TopArticlesList
