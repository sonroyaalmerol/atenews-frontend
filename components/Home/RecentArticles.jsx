import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import Tag from '@/components/Tag';
import Link from '@/components/Link';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import ReactInfo from '@/components/Social/ReactInfo';

import { animated, useSpring } from 'react-spring';
import { formatDistanceToNow } from 'date-fns';
import slugGenerator from '@/utils/slugGenerator';

import {
  Typography, Paper, Grid, CardActionArea, Hidden,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bannerImage: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  bannerDetailsContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(180deg, transparent, black)',
  },
  bannerDetails: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    color: 'white',
    padding: theme.spacing(4),
  },
  trendingHead: {
    background: '#195EA9',
    color: '#ffffff',
    padding: 20,
    minHeight: 65,
    textAlign: 'center',
    width: '100%',
  },
  trendingItem: {
    position: 'relative',
    width: '100%',
    borderRadius: 0,
    borderBottom: 0,
    borderRight: 0,
    borderLeft: 0,
    padding: theme.spacing(2),
  },
  trendingStats: {
    color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
  },
  trendingStatsText: {
    fontSize: '0.8rem',
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: 'calc(70px + 25px)',
    right: 0,
    borderTop: '20px solid transparent',
    borderBottom: '20px solid transparent',
    borderRight: `20px solid ${theme.palette.background.default}`,
    zIndex: 1,
  },
  twoLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    fontSize: '0.9rem',
  },
  threeLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}));

function RecentArticles({ articles }) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const arrLength = articles.length;
  const [
    hoveredData,
    setHoveredData,
  ] = React.useState(articles[0]);
  const [
    props,
    set,
  ] = useSpring(() => ({ top: 'calc(70px + 25px)' }));
  const [
    elRefs,
    setElRefs,
  ] = React.useState([]);

  React.useEffect(() => {
    // Add or remove refs
    setElRefs((elRefsTmp) => Array(arrLength).fill()
      .map((_, i) => elRefsTmp[i] || React.createRef()));

    if (elRefs.length > 0) {
      set({ top: elRefs[0].current.offsetTop - 70 });
    }
  }, [arrLength]);

  const onHover = (data) => {
    // Console.log(elRefs[data.index].current.getBoundingClientRect())
    set({ top: elRefs[data.index].current.offsetTop - 70 });
    setHoveredData(data);
  };

  return (
    <Grid
      component={Paper}
      container
      spacing={0}
      style={{
        borderRadius: 10,
        overflow: 'hidden',
      }}
      variant="outlined"
    >
      <Hidden xsDown>
        <Grid
          item
          md={8}
          sm={6}
          style={{ position: 'relative' }}
        >
          <animated.div
            className={classes.arrow}
            style={props}
          />
          <div
            className={classes.bannerImage}
            style={{ backgroundImage: `url(${hoveredData.featured_image_src})` }}
          >
            <div className={classes.bannerDetailsContainer}>
              <div className={classes.bannerDetails}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                  >
                    <Tag type={hoveredData.categories_detailed[0]} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <Link
                      color="white"
                      href={slugGenerator(hoveredData)}
                    >
                      <Typography
                        dangerouslySetInnerHTML={{ __html: hoveredData.title.rendered }}
                        style={{ marginTop: theme.spacing(1) }}
                        variant="h5"
                      />
                    </Link>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justify="space-between"
                  spacing={2}
                  style={{ marginTop: theme.spacing(2) }}
                >
                  <Grid
                    item
                    sm={5}
                    xs={6}
                  >
                    <Grid
                      alignItems="center"
                      container
                      spacing={1}
                      wrap="nowrap"
                    >
                      <Grid item>
                        <AccountIcon />
                      </Grid>
                      <Grid item>
                        <Typography
                          style={{ fontSize: '0.7rem' }}
                          variant="subtitle2"
                        >
                          {
                            hoveredData.coauthors.map((author, i) => {
                              if (i === hoveredData.coauthors.length - 2) {
                                return `${author.display_name} `;
                              } if (i !== hoveredData.coauthors.length - 1) {
                                return `${author.display_name}, `;
                              } if (hoveredData.coauthors.length === 1) {
                                return author.display_name;
                              }

                              return `and ${author.display_name}`;
                            })
                          }
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    sm={5}
                    xs={6}
                  >
                    <Grid
                      alignItems="center"
                      container
                      spacing={1}
                      wrap="nowrap"
                    >
                      <Grid item>
                        <ClockIcon />
                      </Grid>
                      <Grid item>
                        <Typography
                          style={{ fontSize: '0.7rem' }}
                          variant="subtitle2"
                        >
                          {formatDistanceToNow(new Date(hoveredData.date), { addSuffix: true })}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    sm={2}
                    xs={false}
                  />
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
      </Hidden>
      <Grid
        item
        md={4}
        sm={6}
      >
        <div className={classes.trendingHead}>
          <Typography variant="h5">Recent Articles</Typography>
        </div>
        { articles.map((article, index) => (
          <CardActionArea
            key={index}
            onClick={() => router.push(slugGenerator(article))}
            onMouseOver={() => onHover({ index, ...article })}
            ref={elRefs[index]}
          >
            <Paper
              variant="outlined"
              className={classes.trendingItem}
            >
              <Grid
                container
                direction="column"
                spacing={1}
                justify="space-between"
              >
                <Grid
                  item
                  xs={12}
                >
                  <Tag type={article.categories_detailed[0]} />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    className={classes.twoLineText}
                    dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <Grid
                    container
                    spacing={2}
                    className={classes.trendingStats}
                  >
                    <Grid
                      item
                      xs
                    >
                      <ReactInfo
                        IconProps={{ className: classes.trendingStatsText }}
                        TextProps={{ className: classes.trendingStatsText }}
                        GridProps={{ alignItems: 'center' }}
                        disableHover
                      />
                    </Grid>
                    <Grid
                      item
                      xs
                    >
                      <Grid
                        container
                        spacing={1}
                        alignItems="center"
                      >
                        <Grid item>
                          <CommentIcon className={classes.trendingStatsText} />
                        </Grid>
                        <Grid item>
                          <Typography
                            className={classes.trendingStatsText}
                            variant="subtitle2"
                          >
                            254
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs
                    >
                      <Grid
                        container
                        spacing={1}
                        alignItems="center"
                      >
                        <Grid item>
                          <ShareIcon className={classes.trendingStatsText} />
                        </Grid>
                        <Grid item>
                          <Typography
                            className={classes.trendingStatsText}
                            variant="subtitle2"
                          >
                            254
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </CardActionArea>
        )) }
      </Grid>
    </Grid>
  );
}

export default RecentArticles;