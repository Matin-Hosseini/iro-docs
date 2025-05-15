function App() {
  return (
    <>
      سید متین حسینی
      <form action="/profile" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar" />
      </form>
    </>
  );
}

export default App;
