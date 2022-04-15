import Feed from "../../components/Feed/Feed";
import Navbar from "../../components/navbar/Navbar";
import SidebarNav from "../../components/sidebarNav/SidebarNav";

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="row container-lg gx-0">
        <section className="col-0 d-none d-sm-block col-sm-2">
          <SidebarNav />
        </section>
        <section className="col-12 col-sm-8">
          <Feed />
        </section>
        <section className="col-2"></section>
      </main>
    </>
  );
};

export default Home;
