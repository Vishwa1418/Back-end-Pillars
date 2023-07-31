import { Outlet, useNavigate } from "react-router"
function Home()
{
    let data = sessionStorage.getItem('userdata')
    data = JSON.parse(data)
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.removeItem('userdata')
        navigate('/login')
    }
    
    return (
       <>
            <div className="home">
                {/* <img src={data.image} className={'image'} alt="avatar"/>
                <h1 className="heading">Welcome back! {data.username}</h1> */}
                <div className="box">
                    <p className="content">
                    Elite Coaching Center provides coaching to people from all walks of life, however with an important thing in common: they want to make conscious choices about their careers, businesses, or personal matters. By conscious choices we mean choices connected to their unique values, talents, and passions, in order to live a fulfilling and purposeful existence.

    At Elite Coaching Center we work with young adults in a critical time of their lives: when it comes to choosing their field of specialisation in their transition from school to university. Of course, we also deal with students in the early years of college or young graduates that find out the choice they made at once does not really fulfill them.

    We believe that the earlier you start to deeply know yourself and explore your talents and passions, the happier and most successful you’ll be in your future profession. For this, Elite Coaching Center works also with schools and parents who want to provide the right environment for their youngsters to reach their highest potential.

    Entrepreneurs and professionals are also a major source of satisfaction for our coaches to work with, as we believe a fulfilling career and balanced personal life is a sure path to self-realisation, while each of our clients’ advances in this direction has a greater impact not only in their immediate environment but often at a larger scale. Our motto, as we help entrepreneurs and professionals to live up to their dreams whether by expanding their businesses or redefining their working lives is: “Envision it – Believe in it – Action it”.

    Through our life coaching practice, at Elite Coaching Center we help individuals to connect with their values in order to get clarity on how to achieve fulfillment from different angles of life, whether related to their professional or personal goals.

    Elite Coaching Center is also about spreading the word of Coaching through its Certified Professional Coaching Program. This not only allows its participants to become a professional coach accredited by the International Coach Federation but is also a great asset to school counsellors, teachers, parents, professionals, and entrepreneurs interested in learning coaching techniques to enhance their relationships and get the best out of their students, children or collaborators.
                    </p>
                </div>
                <div className="box"></div>
            </div>
       </>
    )
}

export default Home