import dayjs from 'dayjs';
import dateHeading from './ts/dateHeading';
import viewsMock from './ts/viewsMock';

describe('Форматирование даты', () => {
    test('корректно распознает сегодняшнюю дату', () => {
        expect(dateHeading(dayjs())).toBe('Сегодня');
    });
    test('корректно распознает вчерашнюю дату', () => {
        expect(dateHeading(dayjs().subtract(1, 'day'))).toBe('Вчера');
    });
    test('корректно форматирует дату этого года', () => {
        expect(dateHeading('2023-01-17T11:43:00+0300')).toBe('17 января');
    });
    test('корректно форматирует дату другого года', () => {
        expect(dateHeading('2022-01-17T11:43:00+0300')).toBe('17 января 2022');
    });
});

describe('Парсинг данных', () => {
    test('корректно парсит 1 просмотр за день', () => {
        expect(
            viewsMock([
                {
                    createdAt: '2023-02-12T12:32:00+0300',
                    viewed: true,
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    }
                }
            ])
        ).toStrictEqual({
            '12 февраля': {
                HeadHunter: {
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    },
                    viewTime: ['14:32'],
                    viewed: true
                }
            }
        });
    });
    test('корректно парсит 2 просмотра от одной компании за день', () => {
        expect(
            viewsMock([
                {
                    createdAt: '2023-02-12T12:32:00+0300',
                    viewed: true,
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    }
                },
                {
                    createdAt: '2023-02-12T13:32:00+0300',
                    viewed: true,
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    }
                }
            ])
        ).toStrictEqual({
            '12 февраля': {
                HeadHunter: {
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    },
                    viewTime: ['14:32', '15:32'],
                    viewed: true
                }
            }
        });
    });
    test('корректно парсит просмотры от двух компаний за один день', () => {
        expect(
            viewsMock([
                {
                    createdAt: '2023-02-12T12:32:00+0300',
                    viewed: true,
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    }
                },
                {
                    createdAt: '2023-02-12T13:32:00+0300',
                    viewed: true,
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    }
                },
                {
                    createdAt: '2023-02-12T12:32:00+0300',
                    viewed: true,
                    employer: {
                        id: '1942330',
                        name: 'Пятёрочка',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1942330'
                        }
                    }
                },
                {
                    createdAt: '2023-02-12T13:32:00+0300',
                    viewed: true,
                    employer: {
                        id: '1942330',
                        name: 'Пятёрочка',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1942330'
                        }
                    }
                }
            ])
        ).toStrictEqual({
            '12 февраля': {
                HeadHunter: {
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    },
                    viewTime: ['14:32', '15:32'],
                    viewed: true
                },
                Пятёрочка: {
                    employer: {
                        id: '1942330',
                        name: 'Пятёрочка',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1942330'
                        }
                    },
                    viewTime: ['14:32', '15:32'],
                    viewed: true
                }
            }
        });
    });
    test('корректно парсит просмотры от одной компании в два разных дня', () => {
        expect(
            viewsMock([
                {
                    createdAt: '2023-02-12T12:32:00+0300',
                    viewed: true,
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    }
                },
                {
                    createdAt: '2023-02-13T12:32:00+0300',
                    viewed: true,
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    }
                }
            ])
        ).toStrictEqual({
            '12 февраля': {
                HeadHunter: {
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    },
                    viewTime: ['14:32'],
                    viewed: true
                }
            },
            '13 февраля': {
                HeadHunter: {
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    },
                    viewTime: ['14:32'],
                    viewed: true
                }
            }
        });
    });
    test('корректно парсит просмотры от двух компаний за два разных дня', () => {
        expect(
            viewsMock([
                {
                    createdAt: '2023-02-12T12:32:00+0300',
                    viewed: true,
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    }
                },
                {
                    createdAt: '2023-02-13T12:32:00+0300',
                    viewed: true,
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    }
                },
                {
                    createdAt: '2023-02-12T12:32:00+0300',
                    viewed: true,
                    employer: {
                        id: '1942330',
                        name: 'Пятёрочка',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1942330'
                        }
                    }
                },
                {
                    createdAt: '2023-02-13T12:32:00+0300',
                    viewed: true,
                    employer: {
                        id: '1942330',
                        name: 'Пятёрочка',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1942330'
                        }
                    }
                }
            ])
        ).toStrictEqual({
            '12 февраля': {
                HeadHunter: {
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    },
                    viewTime: ['14:32'],
                    viewed: true
                },
                Пятёрочка: {
                    employer: {
                        id: '1942330',
                        name: 'Пятёрочка',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1942330'
                        }
                    },
                    viewTime: ['14:32'],
                    viewed: true
                }
            },
            '13 февраля': {
                HeadHunter: {
                    employer: {
                        id: '1455',
                        name: 'HeadHunter',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1455'
                        }
                    },
                    viewTime: ['14:32'],
                    viewed: true
                },
                Пятёрочка: {
                    employer: {
                        id: '1942330',
                        name: 'Пятёрочка',
                        logo: {
                            url: 'https://hh.ru/employer/logo/1942330'
                        }
                    },
                    viewTime: ['14:32'],
                    viewed: true
                }
            }
        });
    });
});
