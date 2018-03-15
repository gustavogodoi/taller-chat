import React from 'react'
import { func, array } from 'prop-types'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { noSpecialCharacter } from 'app/lib/form/validation'

const mutation = gql`
  mutation CreateChannel ($name: String!) {
    createTaxonomyTermChannel (input: { name: $name }) {
      violations {
        message
        path
        code
      }
      errors
      entity {
        entityId
      }
    }
  }
`

// @TODO: implement optimistic query on channels?

const NewChannelContainer = ({ channels, children }) => (
  <Mutation mutation={ mutation } refetchQueries={ ['Channels'] }>
    { mutate => (
      children(name => {
        if (name) {
          if (channels.find(channel => channel.name === name)) {
            window.alert(`There is already a channel called ${name}! O.o`)
          }
          else {
            const test = noSpecialCharacter(name)
            if (test) {
              window.alert(`${test}`)
            }
            else {
              mutate({ variables: { name } })
            }
          }
        }
      })
    ) }
  </Mutation>
)

NewChannelContainer.propTypes = {
  children: func,
  channels: array
}

export default NewChannelContainer
