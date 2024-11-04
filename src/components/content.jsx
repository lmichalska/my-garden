import cat1 from "../assets/cat1.png"
import cat2 from "../assets/cat2.png"

export default function Content() {
    const contentData = [
        {
            headline: "Space Cat Adventures",
            tagline: "An epic cosmic journey",
            text: "Follow our brave space cat as it embarks on thrilling missions across the universe. From dodging asteroids to making friends with alien creatures, every moment is an adventure!",
            image: cat1,
            imagePosition: "left"
        },
        {
            headline: "Galactic Paws: The Space Cat Chronicles",
            tagline: "One paw at a time!",
            text: "From saving space stations from malfunctioning AI systems to exploring uncharted planets, Captain Whiskers proves that even in the vastness of the universe, curiosity is a cat’s greatest weapon.",
            image: cat2,
            imagePosition: "right"
        }
    ];

    return (
        <div className="cats">
            {contentData.map((content, index) => (
                <div key={index}>
                    {content.imagePosition === "left" ? (
                        <><div className="container">
                            <img src={content.image} width="30%" height="auto" alt="cat" />
                            <div className="content-text">
                                <section className="headline">{content.headline}</section>
                                <section className="tagline">{content.tagline}</section>
                                <section className="text">{content.text}</section>
                            </div></div>
                        </>
                    ) : (
                        <><div className="container" style={{background: '#580030'
                    }}>
                            <div className="content-text">
                                <section className="headline" style={{color: 'white'}}>{content.headline}</section>
                                <section className="tagline">{content.tagline}</section>
                                <section className="text" style={{color: 'white'}}>{content.text}</section>
                            </div>
                            <img src={content.image} width="30%" height="auto" alt="cat" />
                        </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}