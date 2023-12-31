function showList(listId) {
    const list1Container = document.getElementById('list1-container');
    const list2Container = document.getElementById('list2-container');
  
    if (listId === 'list1') {
      list1Container.style.display = 'block';
      list2Container.style.display = 'none';
    } else if (listId === 'list2') {
      list1Container.style.display = 'none';
      list2Container.style.display = 'block';
    }
  }