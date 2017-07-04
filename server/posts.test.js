import _ from 'lodash'

import faker from 'faker'

import { expect } from 'chai'

import Posts from '/collections/posts'

describe('users', function () {

  describe('create user', function () {
    it('should have a demo user', function () {
      if (! Meteor.users.findOne({ username: 'demo' })) {
        const userId = Accounts.createUser({
          username: 'demo',
          password: 'demo',
        })
        expect(userId).to.be.a('string')
      }
    })
  })

})

describe('posts methods', function () {

  let postId

  beforeEach(() => {
    sinon.stub(Meteor, 'userId')
    Meteor.userId.returns(123)
  })

  afterEach(() => {
    Meteor.userId.restore()
  })

  describe('posts collection', function () {
    it('should be a mongo collection', function () {
      expect(Posts).to.be.an.instanceof(Mongo.Collection)
    })
  })

  describe('create a post', function () {
    it('should return post id', function () {
      postId = Meteor.call('posts.create', { title: 'this is a post' })
      expect(postId).to.be.a('string')
    })
  })

  describe('update the post', function () {
    it('should return affected documents length 1', function () {
      const updated = Meteor.call('posts.update', postId, { title: 'this is a new post' })
      expect(updated).to.equal(1)
    })
  })

  describe('find updated post', function () {
    it('should return new post title', function () {
      const title = _.get(Posts.findOne(postId), 'title')
      expect(title).to.equal('this is a new post')
    })
  })

  describe('remove the post', function () {
    it('should return removed documents length 1', function () {
      const removed = Meteor.call('posts.remove', postId)
      expect(removed).to.equal(1)
    })
  })

})
