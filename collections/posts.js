const Posts = new Mongo.Collection('posts')

Meteor.methods({

  'posts.create'(data) {
    if (! Meteor.userId())
      throw new Meteor.Error('未登录')

    return Posts.insert(data)
  },

  'posts.update'(id, data) {
    if (! Meteor.userId())
      throw new Meteor.Error('未登录')

    return Posts.update(id, { $set: data })
  },

  'posts.remove'(id) {
    if (! Meteor.userId())
      throw new Meteor.Error('未登录')

    return Posts.remove(id)
  },

})

export default Posts
