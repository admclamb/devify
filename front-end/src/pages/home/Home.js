import Feed from '../../components/Feed/Feed';
import Navbar from '../../components/navbar/Navbar';
import SidebarNav from '../../components/sidebarNav/SidebarNav';

const Home = ({ reactions, setReactions }) => {
  return (
    <>
      <div className="container">
        <main className="row gx-0">
          <aside className="col-0 d-none d-md-block col-sm-2">
            <SidebarNav />
          </aside>
          <section className="col-12 col-md-8">
            <Feed reactions={reactions} setReactions={setReactions} />
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
