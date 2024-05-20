// src/components/news/NewsCard.tsx
import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Article } from '../../util/pages/news/types'
import { ListGroup } from 'react-bootstrap'
import styles from './newsCard.module.css'

interface Props {
  article: Article
}

const NewsCard: React.FC<Props> = ({ article }) => {
  return (
    <Card className={`m-4 p-4 ${styles.newsCard}`} style={{ width: '25rem' }}>
      <div className={styles.cardImgContainer}>
        <Card.Img
          variant="top"
          src={article.urlToImage ? article.urlToImage : '/assets/noImage.jpg'}
          className={styles.cardImg}
        />
      </div>
      <Card.Body className={styles.cardBody}>
        <Card.Title style={{ minHeight: '140px' }}>{article.title}</Card.Title>
        <hr />
        <Card.Text className={styles.cardText}>{article.description}</Card.Text>
      </Card.Body>
      <ListGroup className={styles.listGroupFlush}>
        <ListGroup.Item>Author: {article.author}</ListGroup.Item>
        <ListGroup.Item>
          Published: {new Date(article.publishedAt).toLocaleDateString()}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className="text-center">
        <Button href={article.url} variant="primary">
          More info...
        </Button>
      </Card.Body>
    </Card>
  )
}

export default NewsCard
