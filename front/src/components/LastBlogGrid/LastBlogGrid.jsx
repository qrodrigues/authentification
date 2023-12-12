import './LastBlogGrid.scss'
import BlogCard from './BlogCard/BlogCard'

function LastBlogGrid() {
  const blogs = [
    {
      "title": "CodeCrafting",
      "description": "Blog de Développement Web",
      "link": "/blogs/codecrafting",
      "articles": [
        {
          "title": "Maîtrisez JavaScript en 30 jours",
          "content": "Explorez les concepts avancés de JavaScript et devenez un expert en développement web. Des tutoriels pratiques et des astuces utiles vous attendent.",
          "link": "/blogs/codecrafting/articles/1"
        },
        {
          "title": "Les dernières tendances en CSS",
          "content": "Restez à jour avec les dernières fonctionnalités CSS. Apprenez à créer des mises en page modernes et réactives pour vos projets web.",
          "link": "/blogs/codecrafting/articles/2"
        }
      ],
      "author": "Emma Coder",
      "status": "public"
    },
    {
      "title": "PixelPerfection",
      "description": "Blog de Design Graphique",
      "link": "/blogs/pixelperfection",
      "articles": [
        {
          "title": "Créer des designs époustouflants avec Photoshop",
          "content": "Découvrez des techniques avancées de design graphique avec Photoshop. Des astuces pour créer des visuels accrocheurs et professionnels.",
          "link": "/blogs/pixelperfection/articles/3"
        },
        {
          "title": "Guide du débutant pour l'UI/UX",
          "content": "Explorez les principes de base du design d'interface utilisateur et d'expérience utilisateur. Créez des interfaces intuitives et engageantes.",
          "link": "/blogs/pixelperfection/articles/4"
        }
      ],
      "author": "Alex Graphic",
      "status": "public"
    },
    {
      "title": "Saveurs du Monde",
      "description": "Blog de Cuisine",
      "link": "/blogs/saveursdumonde",
      "articles": [
        {
          "title": "Recettes traditionnelles italiennes",
          "content": "Plongez dans la richesse de la cuisine italienne avec des recettes authentiques. Des pâtes savoureuses aux délicieux desserts, explorez la gastronomie italienne.",
          "link": "/blogs/saveursdumonde/articles/5"
        },
        {
          "title": "Cuisiner sainement sans sacrifier le goût",
          "content": "Découvrez des recettes équilibrées qui ne compromettent pas la saveur. Des conseils pratiques pour une alimentation saine et délicieuse.",
          "link": "/blogs/saveursdumonde/articles/6"
        }
      ],
      "author": "Sophie Cuisine",
      "status": "public"
    },
    {
      "title": "Voyage Introspectif",
      "description": "Blog Personnel",
      "link": "/blogs/voyageintrospectif",
      "articles": [
        {
          "title": "Exploration de la méditation guidée",
          "content": "Partagez mon voyage personnel à travers la méditation guidée. Découvrez les bienfaits de la pleine conscience et de la tranquillité intérieure.",
          "link": "/blogs/voyageintrospectif/articles/7"
        },
        {
          "title": "Récits de mes aventures de voyage",
          "content": "Parcourez le monde à travers mes yeux. Des récits captivants et des conseils de voyage pour les amateurs d'aventure.",
          "link": "/blogs/voyageintrospectif/articles/8"
        }
      ],
      "author": "Mia Exploratrice",
      "status": "public"
    },
    {
      "title": "Évolution Personnelle",
      "description": "Blog Privé de Développement Personnel",
      "link": "/blogs/evolutionpersonnelle",
      "articles": [
        {
          "title": "Surmonter les obstacles de la vie",
          "content": "Partagez mes expériences sur la surmonte des obstacles et des défis de la vie. Des conseils pratiques pour une croissance personnelle durable.",
          "link": "/blogs/evolutionpersonnelle/articles/9"
        },
        {
          "title": "Journal de gratitude quotidien",
          "content": "Explorez le pouvoir de la gratitude à travers mon journal quotidien. Des exercices pour cultiver une attitude positive et reconnaissante.",
          "link": "/blogs/evolutionpersonnelle/articles/10"
        }
      ],
      "author": "David Évolution",
      "status": "private"
    },
    {
      "title": "TechInsider",
      "description": "Blog sur les dernières tendances technologiques",
      "link": "/blogs/techinsider",
      "articles": [
        {
          "title": "Les innovations à surveiller en intelligence artificielle",
          "content": "Découvrez les dernières avancées en intelligence artificielle et les applications qui révolutionnent notre quotidien.",
          "link": "/blogs/techinsider/articles/11"
        },
        {
          "title": "Le futur des véhicules autonomes",
          "content": "Explorez les progrès dans le domaine des véhicules autonomes et leurs implications sur l'industrie automobile.",
          "link": "/blogs/techinsider/articles/12"
        }
      ],
      "author": "Sophie Tech",
      "status": "private"
    },
    {
      "title": "HealthyLiving",
      "description": "Blog sur la santé et le bien-être",
      "link": "/blogs/healthyliving",
      "articles": [
        {
          "title": "Les bienfaits du régime méditerranéen",
          "content": "Découvrez comment adopter le régime méditerranéen peut améliorer votre santé et votre bien-être global.",
          "link": "/blogs/healthyliving/articles/13"
        },
        {
          "title": "Pratiquer le yoga pour une vie équilibrée",
          "content": "Explorez les avantages du yoga pour le corps et l'esprit, et apprenez des poses simples pour débuter.",
          "link": "/blogs/healthyliving/articles/14"
        }
      ],
      "author": "Alex Wellness",
      "status": "private"
    },
    {
      "title": "ScienceExploration",
      "description": "Blog sur les découvertes scientifiques fascinantes",
      "link": "/blogs/scienceexploration",
      "articles": [
        {
          "title": "Les mystères du cosmos",
          "content": "Plongez dans l'univers captivant de l'astronomie et explorez les mystères du cosmos.",
          "link": "/blogs/scienceexploration/articles/15"
        },
        {
          "title": "Les avancées récentes en biotechnologie",
          "content": "Découvrez les développements récents en biotechnologie et leur impact sur la médecine et l'environnement.",
          "link": "/blogs/scienceexploration/articles/16"
        }
      ],
      "author": "David Scientist",
      "status": "public"
    },
    {
      "title": "ArtInspiration",
      "description": "Blog sur l'art et l'inspiration créative",
      "link": "/blogs/artinspiration",
      "articles": [
        {
          "title": "L'art de la photographie urbaine",
          "content": "Explorez la beauté de la photographie urbaine et découvrez des conseils pour capturer des images saisissantes en milieu urbain.",
          "link": "/blogs/artinspiration/articles/17"
        },
        {
          "title": "Les tendances artistiques émergentes",
          "content": "Découvrez les artistes émergents et les tendances artistiques qui façonnent le monde de l'art contemporain.",
          "link": "/blogs/artinspiration/articles/18"
        }
      ],
      "author": "Emma Artiste",
      "status": "public"
    }
  ]
  
  

  return (
    <>
    <div className="last_blog_grid">
    {blogs.map((blog, index) => (
          <BlogCard blog={blog} key={index} />
        ))}
    </div>
    </>
  )
}

export default LastBlogGrid
