import { riceZoneApp } from "./reducers";
import { addFollowers, addPosts, addUsers, fetchFollowers, filterPosts, getPosts, getProfile, loadPosts, loadUsers, logOut, removeFollowers, updateHeadline, updateProfile, validateUsers } from "./actions";

test('unknown action', () => {
    let newState = riceZoneApp(undefined, { type: "UNKNOWN ACTION"});
    expect(newState).toEqual({
        userList: [],
        userValidated: false,
        postList: [],
        addFollowerSuccess: false,
        currentPost: [],
        displayPost: [],
        postNum: 0,
        userNum: 0,
        currentUser: '',
        profile_username: '',
        timeStamp: '',
        defaultHeadLine: 'hello world',
        userHeadlineList: [
          {'userId': 1, 'headline': 'hello world'},
          {'userId': 2, 'headline': 'hello world'},
          {'userId': 3, 'headline': 'hello world'},
          {'userId': 4, 'headline': 'hello world'},
          {'userId': 5, 'headline': 'hello world'},
          {'userId': 6, 'headline': 'hello world'},
          {'userId': 7, 'headline': 'hello world'},
          {'userId': 8, 'headline': 'hello world'},
          {'userId': 9, 'headline': 'hello world'},
          {'userId': 10, 'headline': 'hello world'}
        ],
        followerList: [],
        followerReference: [
            {'userId': 1, 'following': [2, 3, 4]},
            {'userId': 2, 'following': [3, 4, 5]},
            {'userId': 3, 'following': [4, 5, 6]},
            {'userId': 4, 'following': [5, 6, 7]},
            {'userId': 5, 'following': [6, 7, 8]},
            {'userId': 6, 'following': [7, 8, 9]},
            {'userId': 7, 'following': [8, 9, 10]},
            {'userId': 8, 'following': [9, 10, 1]},
            {'userId': 9, 'following': [10, 1, 2]},
            {'userId': 10, 'following': [1, 2, 3]}
        ]
    });
});

test('login action for registered user', async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    let previousState = riceZoneApp(undefined, loadUsers(data))
    let user = data[0]
    user['password'] = user.address.street;
    let newState = riceZoneApp(previousState, validateUsers(user));
    expect(newState.userValidated).toEqual(true);
})

test('login action for invalid user', async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    let previousState = riceZoneApp(undefined, loadUsers(data))
    let user = {'username': 'hello', 'password': '123'}
    let newState = riceZoneApp(previousState, validateUsers(user));
    expect(newState.userValidated).toEqual(false);
})

test('logout action', async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    let previousState2 = riceZoneApp(undefined, loadUsers(data))
    let user = {'username': 'hello', 'password': '123'}
    let previousState1 = riceZoneApp(previousState2, validateUsers(user));
    let newState = riceZoneApp(previousState1, logOut());
    expect(newState.userValidated).toEqual(false);
})

test('fetch all articles for current logged in user', async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    const response_posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response_posts.json();
    let previousState2 = riceZoneApp(undefined, loadUsers(data))
    let user = data[0]
    user['password'] = user.address.street;
    let previousState1 = riceZoneApp(previousState2, validateUsers(user));
    let previousState = riceZoneApp(previousState1, loadPosts(posts))
    let newState = riceZoneApp(previousState, getPosts(user));
    expect(newState.currentPost).toEqual(
        [{
            "userId": 1,
            "author": "Bret",
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          },
          {
            "userId": 1,
            "author": "Bret",
            "id": 2,
            "title": "qui est esse",
            "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
          },
          {
            "userId": 1,
            "author": "Bret",
            "id": 3,
            "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
            "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
          },
          {
            "userId": 1,
            "author": "Bret",
            "id": 4,
            "title": "eum et est occaecati",
            "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
          },
          {
            "userId": 1,
            "author": "Bret",
            "id": 5,
            "title": "nesciunt quas odio",
            "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
          },
          {
            "userId": 1,
            "author": "Bret",
            "id": 6,
            "title": "dolorem eum magni eos aperiam quia",
            "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
          },
          {
            "userId": 1,
            "author": "Bret",
            "id": 7,
            "title": "magnam facilis autem",
            "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
          },
          {
            "userId": 1,
            "author": "Bret",
            "id": 8,
            "title": "dolorem dolore est ipsam",
            "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
          },
          {
            "userId": 1,
            "author": "Bret",
            "id": 9,
            "title": "nesciunt iure omnis dolorem tempora et accusantium",
            "body": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
          },
          {
            "userId": 1,
            "author": "Bret",
            "id": 10,
            "title": "optio molestias id quia eum",
            "body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
          }]
    );
})

test('fetch subset of articles for current logged in user given search keyword', async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    const response_posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response_posts.json();
    let previousState3 = riceZoneApp(undefined, loadUsers(data))
    let user = data[0]
    user['password'] = user.address.street;
    let previousState2 = riceZoneApp(previousState3, validateUsers(user));
    let previousState1 = riceZoneApp(previousState2, loadPosts(posts))
    let previousState = riceZoneApp(previousState1, getPosts(user));
    let newState = riceZoneApp(previousState, filterPosts('sunt aut facere repellat provident occaecati excepturi optio reprehenderit'))
    expect(newState.displayPost).toEqual(
        [{
            "userId": 1,
            "author": "Bret",
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          }
        ]
    );
})

test('add articles when adding a follower', async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    const response_posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response_posts.json();
    let previousState3 = riceZoneApp(undefined, loadUsers(data))
    let user = data[0]
    user['password'] = user.address.street;
    let previousState2 = riceZoneApp(previousState3, validateUsers(user));
    let previousState1 = riceZoneApp(previousState2, loadPosts(posts));
    let previousState = riceZoneApp(previousState1, getPosts(user));
    let newState = riceZoneApp(previousState, addFollowers({'follower': "Leopoldo_Corkery"}));
    let newState1 = riceZoneApp(newState, getPosts(user))
    expect(newState1.currentPost).toEqual(
      [
        {
          "userId": 6,
          "author": "Leopoldo_Corkery",
          "id": 60,
          "title": "consequatur placeat omnis quisquam quia reprehenderit fugit veritatis facere",
          "body": "asperiores sunt ab assumenda cumque modi velit\nqui esse omnis\nvoluptate et fuga perferendis voluptas\nillo ratione amet aut et omnis"
        },
        {
          "userId": 6,
          "author": "Leopoldo_Corkery",
          "id": 59,
          "title": "qui commodi dolor at maiores et quis id accusantium",
          "body": "perspiciatis et quam ea autem temporibus non voluptatibus qui\nbeatae a earum officia nesciunt dolores suscipit voluptas et\nanimi doloribus cum rerum quas et magni\net hic ut ut commodi expedita sunt"
        },
        {
          "userId": 6,
          "author": "Leopoldo_Corkery",
          "id": 58,
          "title": "voluptatum itaque dolores nisi et quasi",
          "body": "veniam voluptatum quae adipisci id\net id quia eos ad et dolorem\naliquam quo nisi sunt eos impedit error\nad similique veniam"
        },
        {
          "userId": 6,
          "author": "Leopoldo_Corkery",
          "id": 57,
          "title": "sed ab est est",
          "body": "at pariatur consequuntur earum quidem\nquo est laudantium soluta voluptatem\nqui ullam et est\net cum voluptas voluptatum repellat est"
        },
        {
          "userId": 6,
          "author": "Leopoldo_Corkery",
          "id": 56,
          "title": "qui et at rerum necessitatibus",
          "body": "aut est omnis dolores\nneque rerum quod ea rerum velit pariatur beatae excepturi\net provident voluptas corrupti\ncorporis harum reprehenderit dolores eligendi"
        },
        {
          "userId": 6,
          "author": "Leopoldo_Corkery",
          "id": 55,
          "title": "sit vel voluptatem et non libero",
          "body": "debitis excepturi ea perferendis harum libero optio\neos accusamus cum fuga ut sapiente repudiandae\net ut incidunt omnis molestiae\nnihil ut eum odit"
        },
        {
          "userId": 6,
          "author": "Leopoldo_Corkery",
          "id": 54,
          "title": "sit asperiores ipsam eveniet odio non quia",
          "body": "totam corporis dignissimos\nvitae dolorem ut occaecati accusamus\nex velit deserunt\net exercitationem vero incidunt corrupti mollitia"
        },
        {
          "userId": 6,
          "author": "Leopoldo_Corkery",
          "id": 53,
          "title": "ut quo aut ducimus alias",
          "body": "minima harum praesentium eum rerum illo dolore\nquasi exercitationem rerum nam\nporro quis neque quo\nconsequatur minus dolor quidem veritatis sunt non explicabo similique"
        },
        {
          "userId": 6,
          "author": "Leopoldo_Corkery",
          "id": 52,
          "title": "qui enim et consequuntur quia animi quis voluptate quibusdam",
          "body": "iusto est quibusdam fuga quas quaerat molestias\na enim ut sit accusamus enim\ntemporibus iusto accusantium provident architecto\nsoluta esse reprehenderit qui laborum"
        },
        {
          "userId": 6,
          "author": "Leopoldo_Corkery",
          "id": 51,
          "title": "soluta aliquam aperiam consequatur illo quis voluptas",
          "body": "sunt dolores aut doloribus\ndolore doloribus voluptates tempora et\ndoloremque et quo\ncum asperiores sit consectetur dolorem"
        },
        {
        "userId": 1,
        "author": "Bret",
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        "userId": 1,
        "author": "Bret",
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      },
      {
        "userId": 1,
        "author": "Bret",
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
      },
      {
        "userId": 1,
        "author": "Bret",
        "id": 4,
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
      },
      {
        "userId": 1,
        "author": "Bret",
        "id": 5,
        "title": "nesciunt quas odio",
        "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
      },
      {
        "userId": 1,
        "author": "Bret",
        "id": 6,
        "title": "dolorem eum magni eos aperiam quia",
        "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
      },
      {
        "userId": 1,
        "author": "Bret",
        "id": 7,
        "title": "magnam facilis autem",
        "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
      },
      {
        "userId": 1,
        "author": "Bret",
        "id": 8,
        "title": "dolorem dolore est ipsam",
        "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
      },
      {
        "userId": 1,
        "author": "Bret",
        "id": 9,
        "title": "nesciunt iure omnis dolorem tempora et accusantium",
        "body": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
      },
      {
        "userId": 1,
        "author": "Bret",
        "id": 10,
        "title": "optio molestias id quia eum",
        "body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
      }]
    );
})

test('remove articles when removing a follower', async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    const response_posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response_posts.json();
    let previousState3 = riceZoneApp(undefined, loadUsers(data))
    let user = data[0]
    user['password'] = user.address.street;
    let previousState2 = riceZoneApp(previousState3, validateUsers(user));
    let previousState1 = riceZoneApp(previousState2, loadPosts(posts));
    let previousState_add = riceZoneApp(previousState1, addFollowers({'follower': "Leopoldo_Corkery"}));
    let previousState = riceZoneApp(previousState_add, getPosts(user));
    let newState = riceZoneApp(previousState, removeFollowers({'username': 'Leopoldo_Corkery'}));
    let newState1 = riceZoneApp(newState, getPosts(user));
    expect(newState1.displayPost.length).toBeLessThan(newState.displayPost.length);
})

test('fetch the logged in user profile username', async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    let previousState2 = riceZoneApp(undefined, loadUsers(data))
    let user = data[0]
    user['password'] = user.address.street;
    let previousState1 = riceZoneApp(previousState2, validateUsers(user));
    let newState = riceZoneApp(previousState1, getProfile('Bret'));
    expect(newState.profile_username).toEqual('Bret');
})

test('user added successfully when registered', async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    let previousState2 = riceZoneApp(undefined, loadUsers(data));
    let newState = riceZoneApp(previousState2, addUsers({'username': 'hello'}));
    expect(newState.userNum).toEqual(11);
})

test('post added successfully', async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    const response_posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response_posts.json();
    let previousState2 = riceZoneApp(undefined, loadUsers(data))
    let user = data[0]
    user['password'] = user.address.street;
    let previousState1 = riceZoneApp(previousState2, validateUsers(user));
    let previousState = riceZoneApp(previousState1, loadPosts(posts))
    let newState1 = riceZoneApp(previousState, getPosts(user));
    let newState2 = riceZoneApp(previousState, addPosts({'author':'hello'}));
    expect(newState2.postNum).toBeGreaterThan(newState1.postNum);
})

test('fetch followers successfully', async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    let previousState2 = riceZoneApp(undefined, loadUsers(data))
    let user = data[0]
    user['password'] = user.address.street;
    let previousState1 = riceZoneApp(previousState2, validateUsers(user));
    let newState = riceZoneApp(previousState1, fetchFollowers(1))
    expect(newState.followerList.length).toEqual(3);
})

test('update profile', async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    let previousState2 = riceZoneApp(undefined, loadUsers(data))
    let user = data[0]
    user['password'] = user.address.street;
    let previousState1 = riceZoneApp(previousState2, validateUsers(user));
    let newState = riceZoneApp(previousState1, updateProfile({'zipcode': '12345'}));
    expect(newState.currentUser.zipcode).toEqual('12345');
})

test('update headline', async() => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  let previousState2 = riceZoneApp(undefined, loadUsers(data))
  let user = data[0]
  user['password'] = user.address.street;
  let previousState1 = riceZoneApp(previousState2, validateUsers(user));
  let newState = riceZoneApp(previousState1, updateHeadline({'headline':'123'}));
  expect(newState.userHeadlineList).toEqual(
    [
      {'userId': 1, 'headline': '123'},
      {'userId': 2, 'headline': 'hello world'},
      {'userId': 3, 'headline': 'hello world'},
      {'userId': 4, 'headline': 'hello world'},
      {'userId': 5, 'headline': 'hello world'},
      {'userId': 6, 'headline': 'hello world'},
      {'userId': 7, 'headline': 'hello world'},
      {'userId': 8, 'headline': 'hello world'},
      {'userId': 9, 'headline': 'hello world'},
      {'userId': 10, 'headline': 'hello world'}
  ]
  )
})